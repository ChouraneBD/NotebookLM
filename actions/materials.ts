'use server'

import { createClient } from '@/utils/supabase/server'
import OpenAI from 'openai'
import pdf from 'pdf-parse'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function uploadMaterial(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) {
        throw new Error('No file provided')
    }

    const supabase = await createClient()

    // 1. Upload file to Storage
    const fileName = `${Date.now()}_${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('materials')
        .upload(fileName, file)

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

    const fileUrl = supabase.storage.from('materials').getPublicUrl(fileName).data.publicUrl

    // 2. Parse text content
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    let textContent = ''

    if (file.type === 'application/pdf') {
        const data = await pdf(buffer)
        textContent = data.text
    } else {
        // Basic text support
        textContent = buffer.toString('utf-8')
    }

    // 3. Create Study Material Record
    const { data: materialData, error: materialError } = await supabase
        .from('study_materials')
        .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id!,
            title: file.name,
            original_file_url: fileUrl,
            processed_text_content: textContent,
        })
        .select()
        .single()

    if (materialError) throw new Error(`DB Insert failed: ${materialError.message}`)

    // 4. Chunk text and generate embeddings
    const chunks = chunkText(textContent, 1000)

    for (const chunk of chunks) {
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: chunk,
        })

        const embedding = embeddingResponse.data[0].embedding

        const { error: vectorError } = await supabase.from('document_sections').insert({
            material_id: materialData.id,
            content_chunk: chunk,
            embedding: embedding as any, // Vector type casting
        })

        if (vectorError) console.error('Vector insert error:', vectorError)
    }

    return { success: true, materialId: materialData.id }
}

function chunkText(text: string, chunkSize: number): string[] {
    const chunks = []
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize))
    }
    return chunks
}
