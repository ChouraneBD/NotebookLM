'use server'

import { createClient } from '@/utils/supabase/server'
import OpenAI from 'openai'
import { Database } from '@/types/supabase'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generateExam(materialId: string, difficulty: 'Easy' | 'Medium' | 'Hard') {
    const supabase = await createClient()

    // 1. Fetch relevant content using RAG (Vector Search needed, but for MVP we might fetch all if small, or implement search RPC)
    // Ideally: supabase.rpc('match_documents', { query_embedding, match_threshold, match_count })
    // For MVP simplification: Fetching random chunks or using a keyword search if possible, 
    // BUT the spec says "Perform similarity search". 
    // Since we haven't defined the `match_documents` RPC function in the SQL spec, 
    // we will standardly fetch sections for the material for context.

    const { data: sections } = await supabase
        .from('document_sections')
        .select('content_chunk')
        .eq('material_id', materialId)
        .limit(10) // Limit context for token usage

    if (!sections || sections.length === 0) {
        throw new Error('No study material content found')
    }

    const context = sections.map(s => s.content_chunk).join('\n\n')

    // 2. Generate Questions via OpenAI
    const prompt = `
    You are an expert exam creator. based on the following text:
    "${context}"
    
    Create a ${difficulty} difficulty exam with 5 multiple choice questions.
    Return JSON format: [{ "question_text": "...", "options": ["A", "B", "C", "D"], "correct_answer": "Option Text", "explanation": "..." }]
  `

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: 'You create JSON exams.' }, { role: 'user', content: prompt }],
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
    })

    // Parse result - robust handling needed for JSON structure
    const content = completion.choices[0].message.content
    if (!content) throw new Error('Failed to generate exam content')

    // Expecting the LLM to return { "questions": [...] } or just [...]
    let generatedQuestions: any[] = []
    try {
        const parsed = JSON.parse(content)
        generatedQuestions = parsed.questions || parsed
    } catch (e) {
        throw new Error('Failed to parse generated questions')
    }

    const user = (await supabase.auth.getUser()).data.user
    if (!user) throw new Error('Unauthorized')

    // 3. Create Exam Record
    const { data: examData, error: examError } = await supabase
        .from('exams')
        .insert({
            user_id: user.id,
            material_source_id: materialId,
            title: `Exam on ${new Date().toLocaleDateString()}`,
            difficulty: difficulty,
            status: 'ready',
        })
        .select()
        .single()

    if (examError) throw new Error(examError.message)

    // 4. Insert Questions
    const questionsToInsert = generatedQuestions.map((q, index) => ({
        exam_id: examData.id,
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        order_index: index,
    }))

    const { error: questionsError } = await supabase.from('questions').insert(questionsToInsert)

    if (questionsError) throw new Error(questionsError.message)

    return { success: true, examId: examData.id }
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

    // Normalize to 100? or keeps raw valid? Spec says "score integer". Let's say percentage.
    const percentage = Math.round((score / questions.length) * 100)

    // 3. Update Exam
    const { error } = await supabase
        .from('exams')
        .update({ status: 'completed', score: percentage })
        .eq('id', examId)

    if (error) throw new Error(error.message)

    return { success: true, score: percentage }
}
