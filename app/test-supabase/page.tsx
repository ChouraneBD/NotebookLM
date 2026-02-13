'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function TestPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const testConnection = async () => {
            try {
                const supabase = createClient()
                // Try to fetch something simple. profiles might be empty but the query should succeed.
                // If RLS allows reading profiles (which we set up), this should work.
                // If not, we might get an empty list or error, but connection is successful if we get a response.
                const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })

                if (error) {
                    // If the error code is 'PGRST116' or similar, it means it connected.
                    // Connection refused would be different.
                    throw error
                }

                setStatus('success')
                setMessage('Connected to Supabase successfully!')
            } catch (e: any) {
                setStatus('error')
                setMessage(`Connection failed: ${e.message || JSON.stringify(e)}`)
            }
        }

        testConnection()
    }, [])

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
            {status === 'loading' && <p>Testing connection...</p>}
            {status === 'success' && <p className="text-green-600 font-bold">{message}</p>}
            {status === 'error' && <p className="text-red-600">{message}</p>}
        </div>
    )
}
