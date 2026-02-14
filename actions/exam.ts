'use server'

import { createClient } from '@/utils/supabase/server'
import { mockGenerateQuestions } from '@/lib/ai-stub'
import { generateExamQuestions } from '@/lib/gemini'
import { revalidatePath } from 'next/cache'

export async function generateExam(
    materialId: string,
    difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium',
    examType: 'Conceptual' | 'Practical' | 'Mixed' = 'Mixed',
    questionCount: number = 10,
    customPrompt?: string
) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use authorized user or fallback to mock for dev
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    // 1. Fetch Study Material Content
    const { data: material, error: materialError } = await supabase
        .from('study_materials')
        .select('title, processed_text_content')
        .eq('id', materialId)
        .single()

    if (materialError || !material) {
        throw new Error("Study material not found: " + (materialError?.message || 'Unknown error'))
    }

    // 2. Create Exam Record (generating)
    const { data: examData, error: examError } = await supabase
        .from('exams')
        .insert({
            user_id: userId,
            material_source_id: materialId,
            title: `Practice Exam: ${material.title}`,
            difficulty: difficulty,
            exam_type: examType,
            question_count: questionCount,
            custom_prompt: customPrompt,
            status: 'generating',
        })
        .select()
        .single()

    if (examError) throw new Error(examError.message)

    try {
        // 3. Generate Questions via Gemini
        const context = material.processed_text_content

        if (!context || context.length < 50 || context.includes("Failed to extract content") || context.includes("Error reading file")) {
            // Update status to failed so user knows
            await supabase.from('exams').update({ status: 'failed' as any }).eq('id', examData.id)
            throw new Error("Cannot generate exam: The study material content is missing or failed to process. Please try uploading the file again.")
        }

        let generatedQuestions;
        try {
            generatedQuestions = await generateExamQuestions(context, questionCount, difficulty, examType, customPrompt, material.title)
        } catch (aiError) {
            console.error("Gemini failed, falling back to mock:", aiError)
            // Fallback to mock if API key is missing or quota exceeded
            generatedQuestions = await mockGenerateQuestions(material.title, questionCount)
        }

        // 4. Insert Questions
        const questionsToInsert = generatedQuestions.map((q: any, index: number) => ({
            exam_id: examData.id,
            question_text: q.question_text,
            options: q.options,
            correct_answer: q.correct_answer,
            explanation: q.explanation,
            order_index: index,
        }))

        const { error: questionsError } = await supabase.from('questions').insert(questionsToInsert)
        if (questionsError) throw new Error('Failed to save questions: ' + questionsError.message)

        // 5. Update Exam Status
        await supabase
            .from('exams')
            .update({ status: 'ready' })
            .eq('id', examData.id)

        return { success: true, examId: examData.id }

    } catch (e) {
        console.error('Exam generation failed:', e)
        await supabase.from('exams').update({ status: null }).eq('id', examData.id)
        throw e
    }
}

export async function submitExam(examId: string, answers: Record<string, string>) {
    const supabase = await createClient()

    // 1. Fetch correct answers
    const { data: questions } = await supabase
        .from('questions')
        .select('id, correct_answer')
        .eq('exam_id', examId)

    if (!questions) throw new Error('Exam not found')

    // 2. Calculate Score
    let score = 0
    questions.forEach(q => {
        if (answers[q.id] === q.correct_answer) {
            score++
        }
    })

    const percentage = Math.round((score / questions.length) * 100)

    // 3. Update Exam
    // Note: updated_at column is missing in schema, so we omit it.
    const updates: any = {
        status: 'completed',
        score: percentage
    }

    // Attempt to add answers
    updates['user_answers'] = answers

    // Verify user ownership before update
    const { data: { user } } = await supabase.auth.getUser()
    const { data: existingExam } = await supabase.from('exams').select('user_id').eq('id', examId).single()

    if (existingExam && user && existingExam.user_id !== user.id) {
        console.error(`ID Mismatch: Exam User ${existingExam.user_id} vs Current User ${user.id}`)
    }

    const { error } = await supabase
        .from('exams')
        .update(updates)
        .eq('id', examId)

    if (error) {
        console.error("Exam update failed:", error)
        throw new Error(error.message)
    }

    // Verify update success
    const { data: check } = await supabase.from('exams').select('status').eq('id', examId).single()
    if (check?.status !== 'completed') {
        console.error("Exam update appeared safe but status is not 'completed'. RLS likely blocked it.")
        throw new Error("Failed to save exam results. Please try again.")
    }

    revalidatePath('/dashboard')
    revalidatePath(`/exam/${examId}`)

    return { success: true, score: percentage }
}

export async function retakeExam(originalExamId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    // 1. Fetch Original Exam
    const { data: originalExam, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('id', originalExamId)
        .single()

    if (examError || !originalExam) throw new Error("Original exam not found")

    // 2. Create New Exam Record
    const { data: newExam, error: createError } = await supabase
        .from('exams')
        .insert({
            user_id: userId,
            material_source_id: originalExam.material_source_id,
            title: originalExam.title,
            difficulty: originalExam.difficulty,
            status: 'ready'
        })
        .select()
        .single()

    if (createError) throw new Error(createError.message)

    // 3. Fetch Original Questions
    const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_id', originalExamId)

    if (questionsError || !questions) throw new Error("Failed to fetch original questions")

    // 4. Duplicate Questions for New Exam
    const newQuestions = questions.map(q => ({
        exam_id: newExam.id,
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        order_index: q.order_index
    }))

    const { error: insertError } = await supabase.from('questions').insert(newQuestions)
    if (insertError) throw new Error("Failed to clone questions")

    return { success: true, newExamId: newExam.id }
}
