'use client'

import { useState, useEffect } from 'react'
import { getMaterialContent } from '@/actions/materials'

interface MaterialPreviewModalProps {
    isOpen: boolean
    onClose: () => void
    materialId: string
    materialTitle: string
}

export default function MaterialPreviewModal({ isOpen, onClose, materialId, materialTitle }: MaterialPreviewModalProps) {
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isOpen && materialId) {
            setLoading(true)
            setContent('') // Reset content
            getMaterialContent(materialId)
                .then(text => {
                    setContent(text)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setContent('Error loading content. Please try again.')
                    setLoading(false)
                })
        }
    }, [isOpen, materialId])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[var(--primary-blue)]">visibility</span>
                            Material Preview
                        </h3>
                        <p className="text-sm text-gray-500 truncate max-w-md">{materialTitle}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <span className="material-symbols-outlined animate-spin text-3xl mb-2">refresh</span>
                            <p>Fetching content...</p>
                        </div>
                    ) : (
                        <div className="prose max-w-none">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-gray-700 leading-relaxed overflow-x-auto">
                                    {content || "No text content found."}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-50 bg-white rounded-b-2xl flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
