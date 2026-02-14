'use server'

import { createClient } from '@/utils/supabase/server'
import { generateMockFlashcards } from '@/lib/ai-stub'
import { generateFlashcardsFromText, GeneratedFlashcard } from '@/lib/gemini'

export async function generateFlashcards(examId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // Mock ID for dev if needed
    }
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    // 1. Fetch Exam & Material Content
    const { data: exam } = await supabase
        .from('exams')
        .select('title, material_source_id')
        .eq('id', examId)
        .single()

    if (!exam || !exam.material_source_id) throw new Error("Exam or material source not found")

    const { data: material } = await supabase
        .from('study_materials')
        .select('processed_text_content')
        .eq('id', exam.material_source_id)
        .single()

    // Explicitly handle null title for TS
    const examTitle = exam.title || "Untitled Exam"
    const context = material?.processed_text_content || "No content available."

    // 1.5 Fetch Questions to guide Flashcard generation
    const { data: questions } = await supabase
        .from('questions')
        .select('question_text, correct_answer')
        .eq('exam_id', examId)
        .limit(10)

    const questionsContext = questions && questions.length > 0
        ? `\n\nFocus the flashcards on concepts related to these specific exam questions:\n${questions.map((q: any) => `- ${q.question_text} (Answer: ${q.correct_answer})`).join('\n')}`
        : ''

    // 2. Generate Flashcards via AI
    let flashcardsContent: GeneratedFlashcard[]
    try {
        flashcardsContent = await generateFlashcardsFromText(context + questionsContext, 10)
    } catch (e) {
        console.error("Gemini Flashcard Error, falling back to mock:", e)
        // Fallback to mock, ensuring type compatibility
        const mockData = await generateMockFlashcards(examTitle)
        flashcardsContent = mockData
    }

    // 3. Create Flashcard Set
    const { data: set, error: setError } = await supabase
        .from('flashcard_sets')
        .insert({
            user_id: userId,
            exam_source_id: examId,
            title: `Study Set: ${examTitle}`
        })
        .select()
        .single()

    if (setError) throw new Error(`Failed to create set: ${setError.message}`)

    // 4. Insert Flashcards
    const cardsToInsert = flashcardsContent.map((card) => ({
        set_id: set.id,
        front: card.front,
        back: card.back
    }))

    const { error: cardsError } = await supabase
        .from('flashcards')
        .insert(cardsToInsert)

    if (cardsError) throw new Error(`Failed to insert cards: ${cardsError.message}`)

    return { success: true, setId: set.id }
}

export async function getFlashcardSet(setId: string) {
    const supabase = await createClient()

    // Fetch Set Details
    const { data: set, error: setError } = await supabase
        .from('flashcard_sets')
        .select('*')
        .eq('id', setId)
        .single()

    if (setError) return { error: setError.message }

    // Fetch Cards
    const { data: cards, error: cardsError } = await supabase
        .from('flashcards')
        .select('*')
        .eq('set_id', setId)
        .order('id') // Consistent order

    if (cardsError) return { error: cardsError.message }

    return { set, cards }
}

export async function updateFlashcardMastery(cardId: string, isMastered: boolean) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('flashcards')
        .update({ is_mastered: isMastered })
        .eq('id', cardId)

    if (error) throw new Error(error.message)
    return { success: true }
}
