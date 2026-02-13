'use server'

import { createClient } from '@/utils/supabase/server'
import { mockGenerateQuestions } from '@/lib/ai-stub'

export async function generateExam(materialId: string, difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let userId = user?.id
    if (!userId) {
        console.warn('⚠️ No authenticated user found. Using MOCK_USER_ID for development.')
        userId = '00000000-0000-0000-0000-000000000000'
    }

    // 1. Create Exam Record (generating)
    const { data: examData, error: examError } = await supabase
        .from('exams')
        .insert({
            user_id: userId,
            material_source_id: materialId,
            title: `Practice Exam - ${new Date().toLocaleTimeString()}`,
            difficulty: difficulty,
            status: 'generating',
        })
        .select()
        .single()

    if (examError) throw new Error(examError.message)

    try {
        // 2. Call Mock AI
        // In a real app with vector search, we'd fetch context first.
        // For now, we just mock the questions.
        const generatedQuestions = await mockGenerateQuestions('General', 5)

        // 3. Insert Questions
        const questionsToInsert = generatedQuestions.map((q, index) => ({
            exam_id: examData.id,
            question_text: q.question_text,
            options: q.options, // Postgres JSONB will handle this array automatically
            correct_answer: q.correct_answer,
            explanation: q.explanation,
            order_index: index,
        }))

        const { error: questionsError } = await supabase.from('questions').insert(questionsToInsert)
        if (questionsError) throw new Error('Failed to save questions: ' + questionsError.message)

        // 4. Update Exam Status
        await supabase
            .from('exams')
            .update({ status: 'ready' })
            .eq('id', examData.id)

        return { success: true, examId: examData.id }

    } catch (e) {
        console.error('Exam generation failed:', e)
        // Cleanup or mark as failed
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
    // Note: user_answers column might not exist yet if user hasn't run the SQL.
    // We check or just try update. Ideally for robustness we'd try-catch or assume it's there per instruction.
    // WE WILL TRY TO SAVE USER ANSWERS if the column exists.
    const updates: any = { status: 'completed', score: percentage }

    // Attempt to add answers if we can (ignoring type check failure for now as it's dynamic)
    // In strict TS we might need to cast or extend type.
    updates['user_answers'] = answers

    const { error } = await supabase
        .from('exams')
        .update(updates)
        .eq('id', examId)

    if (error) throw new Error(error.message)

    return { success: true, score: percentage }
}
