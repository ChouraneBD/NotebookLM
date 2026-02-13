'use client'

import Link from 'next/link'

export default function ResultsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--secondary-bg)] font-sans text-[var(--text-main)]">
            <nav className="bg-[var(--surface-color)] border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">school</span>
                            <span className="font-bold text-xl tracking-tight text-[var(--text-main)]">ExamSim AI</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)]" href="/dashboard">Dashboard</Link>
                            <Link className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)]" href="#">My Library</Link>
                            <Link className="text-sm font-medium text-[var(--text-main)] border-b-2 border-[var(--primary-color)]" href="#">Results</Link>
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-[var(--primary-color)] font-bold text-xs">JD</div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-1">
                            <span>AP Biology</span>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span>Practice Test #4</span>
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Test Results Analysis</h1>
                        <p className="text-[var(--text-secondary)] mt-1">Completed on Oct 24, 2023 • 45 mins duration</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                            <span className="material-symbols-outlined text-[18px]">share</span>
                            Share Results
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-dark)] shadow-sm transition-colors shadow-indigo-200">
                            <span className="material-symbols-outlined text-[18px]">bolt</span>
                            Generate Review Flashcards
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[var(--surface-color)] rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                            <h2 className="text-lg font-semibold text-[var(--text-main)] mb-6">Overall Score</h2>
                            {/* Score Circle */}
                            <div className="relative w-40 h-40 rounded-full flex items-center justify-center mb-6 shadow-inner" style={{ background: 'conic-gradient(var(--success-color) 85%, #E5E7EB 0)' }}>
                                <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                                    <span className="text-5xl font-extrabold text-[var(--text-main)]">85%</span>
                                    <span className="text-sm font-medium text-[var(--success-color)] mt-1">Great Job!</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 w-full border-t border-gray-100 pt-6 mt-2">
                                <div>
                                    <div className="text-2xl font-bold text-[var(--text-main)]">42</div>
                                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-medium">Correct</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[var(--error-color)]">8</div>
                                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-medium">Incorrect</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[var(--text-secondary)]">0</div>
                                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-medium">Skipped</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--surface-color)] rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[var(--primary-color)]">pie_chart</span>
                                Topic Mastery
                            </h2>
                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-1">
                                        <span className="text-[var(--text-main)]">Cell Structure</span>
                                        <span className="text-[var(--success-color)]">90%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div className="bg-[var(--success-color)] h-2.5 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mt-1">Strong understanding of organelles.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-1">
                                        <span className="text-[var(--text-main)]">Genetics</span>
                                        <span className="text-[var(--warning-color)]">65%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div className="bg-[var(--warning-color)] h-2.5 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mt-1">Review Punnett squares and inheritance.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-1">
                                        <span className="text-[var(--text-main)]">Evolution</span>
                                        <span className="text-[var(--success-color)]">82%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div className="bg-[var(--success-color)] h-2.5 rounded-full transition-all duration-1000" style={{ width: '82%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-1">
                                        <span className="text-[var(--text-main)]">Ecology</span>
                                        <span className="text-[var(--error-color)]">45%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div className="bg-[var(--error-color)] h-2.5 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mt-1">Focus needed on food webs.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                            <h3 className="font-semibold text-indigo-900 mb-2">Need a quick review?</h3>
                            <p className="text-sm text-indigo-700 mb-4">Based on your weak areas (Genetics, Ecology), AI can generate a targeted study set.</p>
                            <button className="w-full py-2.5 bg-white text-[var(--primary-color)] border border-indigo-200 hover:bg-indigo-50 font-medium rounded-lg text-sm shadow-sm transition-colors">
                                Create Custom Practice Set
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-[var(--surface-color)] rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h2 className="text-lg font-semibold text-[var(--text-main)]">Detailed Question Review</h2>
                                <div className="flex gap-2">
                                    <select className="form-select text-sm border-gray-300 rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] py-1.5 px-3">
                                        <option>All Questions</option>
                                        <option>Incorrect Only</option>
                                        <option>Correct Only</option>
                                        <option>Flagged</option>
                                    </select>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {/* Question 1 */}
                                <details className="group bg-white">
                                    <summary className="flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                                        <div className="mt-1 flex-shrink-0">
                                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-[var(--success-color)]">
                                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-medium text-[var(--text-main)] pr-4">Q1. Which of the following organelles is responsible for cellular respiration?</h3>
                                                <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
                                            </div>
                                            <p className="text-sm text-[var(--text-secondary)] mt-1 truncate group-open:hidden">Your Answer: Mitochondria</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Cell Structure</span>
                                                <span className="text-xs text-gray-400">Easy</span>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="px-5 pb-5 pl-14 text-sm text-[var(--text-secondary)]">
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-4">
                                            <p className="font-medium text-green-900 mb-1">Correct Answer: Mitochondria</p>
                                            <p>Your answer matches the correct answer.</p>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="flex items-center gap-2 font-semibold text-[var(--text-main)] mb-2">
                                                <span className="material-symbols-outlined text-indigo-500 text-lg">auto_awesome</span>
                                                AI Explanation
                                            </h4>
                                            <p className="leading-relaxed">
                                                The mitochondria are known as the "powerhouses" of the cell. They are the sites where cellular respiration occurs, breaking down glucose into ATP.
                                            </p>
                                        </div>
                                    </div>
                                </details>

                                {/* Question 2 */}
                                <details className="group bg-white" open>
                                    <summary className="flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors list-none bg-red-50/30">
                                        <div className="mt-1 flex-shrink-0">
                                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-[var(--error-color)]">
                                                <span className="material-symbols-outlined text-sm font-bold">close</span>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-medium text-[var(--text-main)] pr-4">Q2. In a heterozygous individual (Aa), what is the probability of passing the recessive allele to an offspring?</h3>
                                                <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
                                            </div>
                                            <p className="text-sm text-[var(--text-secondary)] mt-1 truncate group-open:hidden">Your Answer: 25%</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Genetics</span>
                                                <span className="text-xs text-gray-400">Medium</span>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="px-5 pb-5 pl-14 text-sm text-[var(--text-secondary)] bg-red-50/30">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                                <p className="text-xs font-semibold text-red-600 uppercase mb-1">Your Answer</p>
                                                <p className="font-medium text-red-900">25%</p>
                                            </div>
                                            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                                                <p className="text-xs font-semibold text-green-600 uppercase mb-1">Correct Answer</p>
                                                <p className="font-medium text-green-900">50%</p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="flex items-center gap-2 font-semibold text-[var(--text-main)] mb-2">
                                                <span className="material-symbols-outlined text-indigo-500 text-lg">auto_awesome</span>
                                                AI Explanation
                                            </h4>
                                            <p className="leading-relaxed">
                                                According to Mendel's Law of Segregation, a heterozygous individual (Aa) produces two types of gametes: 50% A and 50% a.
                                            </p>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-sm text-gray-500">Showing 1 to 2 of 50 questions</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>Previous</button>
                                    <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
