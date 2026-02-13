'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        try {
            const { data, error } = await supabase.storage
                .from('materials')
                .upload(`${Date.now()}_${file.name}`, file)

            if (error) {
                throw error
            }

            // Trigger server action to process file (placeholder for now)
            // await processFile(data.path)

            alert('Upload successful!')
            router.refresh()
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Error uploading file')
        } finally {
            setUploading(false)
            setFile(null)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <input
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
                className="mb-4"
                accept=".pdf,.txt,.md"
            />
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
                {uploading ? 'Uploading...' : 'Upload Study Material'}
            </button>
        </div>
    )
}
