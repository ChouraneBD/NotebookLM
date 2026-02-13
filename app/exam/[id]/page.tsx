'use client'

import { useEffect, useState } from 'react'

export default function ExamPage() {
    const [timeLeft, setTimeLeft] = useState(2722) // 45:22 in seconds
    const [activeQuestion, setActiveQuestion] = useState(14)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }

    const questions = {
        14: {
            id: 14,
            topic: 'Cellular Respiration',
            text: 'During the electron transport chain in cellular respiration, protons (H+) are pumped from the mitochondrial matrix into the intermembrane space. Which of the following best explains the direct consequence of this proton gradient?',
            options: [
                { id: 'A', text: 'It causes the breakdown of glucose into pyruvate.' },
                { id: 'B', text: 'It drives the synthesis of ATP by ATP synthase as protons flow back into the matrix.' },
                { id: 'C', text: 'It directly reduces NAD+ to NADH for use in the Krebs cycle.' },
                { id: 'D', text: 'It allows oxygen to accept electrons and form water within the intermembrane space.' }
            ]
        }
    }

    const currentQuestion = questions[14]

    return (
        <div className="flex flex-col h-screen bg-[var(--bg-canvas)] text-[var(--text-main)] font-sans overflow-hidden">
            {/* Header */}
            <header className="h-16 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center justify-between px-6 shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold text-[var(--text-main)]">AP Biology Practice Exam 2</h1>
                    <span className="h-5 w-px bg-gray-300 mx-2"></span>
                    <span className="text-sm font-medium text-[var(--text-secondary)]">Section 1: Multiple Choice</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md">
                        <span className="material-symbols-outlined text-slate-500 text-[20px]">timer</span>
                        <span className="font-mono font-semibold text-slate-800 text-lg">{formatTime(timeLeft)}</span>
                    </div>
                    <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-blue)] transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-[20px] fill-0">pause_circle</span>
                        Pause
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content */}
                <main className="flex-1 flex flex-col h-full relative overflow-y-auto scrollbar-hide">
                    <div className="w-full h-1 bg-gray-100 shrink-0">
                        <div className="h-full bg-[var(--primary-blue)] w-[28%] rounded-r-full"></div>
                    </div>
                    <div className="max-w-4xl mx-auto w-full px-8 py-10 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Question {activeQuestion} of 50</span>
                                <span className="bg-gray-100 text-xs px-2 py-0.5 rounded text-gray-500 font-medium border border-gray-200">Topic: {currentQuestion.topic}</span>
                            </div>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-[var(--warning-amber)] transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-amber-50 border border-transparent hover:border-amber-100">
                                <span className="material-symbols-outlined text-[20px] fill-0">flag</span>
                                Flag for Review
                            </button>
                        </div>
                        <div className="prose prose-lg max-w-none text-[var(--text-main)] mb-8 leading-relaxed">
                            <p className="text-xl font-medium">
                                {currentQuestion.text}
                            </p>
                        </div>
                        <div className="space-y-4 mb-12">
                            {currentQuestion.options.map((option) => (
                                <label key={option.id} className="block cursor-pointer group">
                                    <input
                                        className="radio-option hidden"
                                        name={`question${activeQuestion}`}
                                        type="radio"
                                        value={option.id}
                                        checked={selectedAnswer === option.id}
                                        onChange={() => setSelectedAnswer(option.id)}
                                    />
                                    <div className={`flex items-center p-4 rounded-xl border-2 transition-all bg-[var(--bg-surface)] ${selectedAnswer === option.id
                                            ? 'border-[var(--primary-blue)] bg-blue-50 shadow-[0_0_0_1px_var(--primary-blue)]'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-slate-50'
                                        }`}>
                                        <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center mr-4 radio-indicator shrink-0 transition-colors ${selectedAnswer === option.id
                                                ? 'bg-[var(--primary-blue)] border-[var(--primary-blue)]'
                                                : 'border-gray-300 bg-white'
                                            }`}>
                                            <span className={`text-white font-bold text-sm material-symbols-outlined text-[18px] ${selectedAnswer === option.id ? 'opacity-100' : 'opacity-0'
                                                }`}>check</span>
                                        </div>
                                        <span className="text-base text-gray-700 font-medium">{option.text}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="flex-grow"></div>
                    </div>
                    <div className="sticky bottom-0 w-full bg-[var(--bg-surface)] border-t border-[var(--border-color)] px-8 py-4 flex items-center justify-between z-10">
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-slate-700 font-medium hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            Previous
                        </button>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-slate-700 font-medium hover:bg-gray-50 transition-colors">
                                Skip Question
                            </button>
                            <button className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-[var(--primary-blue)] text-white font-medium hover:bg-[var(--primary-dark)] shadow-sm shadow-blue-200 transition-colors">
                                Next
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="w-80 bg-[var(--bg-surface)] border-l border-[var(--border-color)] flex flex-col shrink-0 h-full">
                    <div className="p-6 border-b border-[var(--border-color)]">
                        <h2 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-wide mb-4">Question Navigator</h2>
                        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[var(--primary-blue)]"></div>
                                <span>Answered</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[var(--warning-amber)]"></div>
                                <span>Flagged</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full border border-gray-300 bg-white"></div>
                                <span>Unseen</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-5 gap-3">
                            {/* Hand-coded active state for #14 to match spec */}
                            {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => {
                                let style = "bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                                if (num <= 13 && num !== 4) style = "bg-blue-50 border-blue-200 text-[var(--primary-blue)] hover:bg-blue-100"
                                if (num === 4 || num === 26) style = "bg-amber-50 border-amber-200 text-[var(--warning-amber)] hover:bg-amber-100 relative" // Flagged
                                if (num === 14) style = "bg-[var(--primary-blue)] text-white font-bold shadow-md shadow-blue-200 ring-2 ring-offset-2 ring-blue-500 border-transparent"

                                return (
                                    <button key={num} className={`h-10 w-10 rounded-lg border font-medium text-sm flex items-center justify-center transition-colors ${style}`}>
                                        {num}
                                        {(num === 4 || num === 26) && (
                                            <span className="absolute top-0 right-0 -mt-1 -mr-1 w-2.5 h-2.5 bg-[var(--warning-amber)] rounded-full border-2 border-white"></span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="p-6 border-t border-[var(--border-color)] bg-slate-50 mt-auto">
                        <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2">
                            Submit Exam
                        </button>
                        <p className="text-xs text-center text-slate-400 mt-3">All progress is saved automatically.</p>
                    </div>
                </aside>
            </div>
        </div>
    )
}
