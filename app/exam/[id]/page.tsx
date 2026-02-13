import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ExamInterface from './ExamInterface'

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    // Fetch Exam
    const { data: exam, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('id', id)
        .single()

    if (examError || !exam) {
        return notFound()
    }

    // Fetch Questions
    const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_id', id)
        .order('order_index', { ascending: true })

    if (questionsError || !questions) {
        console.error('Error fetching questions:', questionsError)
        return <div>Error loading exam questions.</div>
    }

    // Validating and casting exam data
    const safeExam = {
        ...exam,
        difficulty: (exam.difficulty as string) || 'Medium' // Default or cast
    }

    // Validating and casting questions data
    const safeQuestions = questions.map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : [] as any,
        order_index: q.order_index ?? 0
    }))

    return <ExamInterface exam={safeExam} questions={safeQuestions} />
}
