import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-50 pt-24 pb-32 min-h-[90vh] flex items-center">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Subtle Grid Pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiIC8+CjxwYXRoIGQ9Ik0wIDEwaDQwTTEwIDB2NDAiIHN0cm9rZT0icmdiYSgwLCAwLCAxMDAsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEuNSIgLz4KPC9zdmc+')] opacity-50 z-0 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-indigo-100 text-indigo-600 font-semibold text-sm mb-8 shadow-sm animate-fade-in-up">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Moraja3aAI 2.0 is here
                </div>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                        Ace Your High School Exams with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-sm">AI-Powered Precision</span>.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Instantly turn your notes into realistic practice tests, receive immediate feedback, and generate personalized flashcards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link
                            href="/dashboard"
                            className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Start Practicing for Free
                                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-indigo-600/100 z-0"></div>
                        </Link>

                        <Link
                            href="#how-it-works"
                            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
                        >
                            See how it works
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}
