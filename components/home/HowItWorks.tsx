export default function HowItWorks() {
    const steps = [
        {
            title: "Upload Your Materials",
            subtitle: "Drag and drop any PDF, text, or paste your class notes directly. Moraja3aAI securely processes your content in seconds.",
            icon: "upload_file",
            color: "text-blue-500",
            bg: "bg-blue-100"
        },
        {
            title: "Simulate Exams",
            subtitle: "Our AI instantly generates practice tests mimicking real exam formats based entirely on your uploaded materials.",
            icon: "quiz",
            color: "text-purple-500",
            bg: "bg-purple-100"
        },
        {
            title: "Master Weak Spots",
            subtitle: "Review detailed explanations for incorrect answers and let our algorithm build personalized flashcards to fill your knowledge gaps.",
            icon: "psychology",
            color: "text-emerald-500",
            bg: "bg-emerald-100"
        }
    ]

    return (
        <section id="how-it-works" className="bg-slate-50 py-24 sm:py-32 border-t border-slate-200 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-20">
                    <h2 className="text-base font-bold leading-7 text-indigo-600 tracking-widest uppercase">Simple Process</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">From Notes to Mastery in 3 Steps</p>
                </div>

                <div className="relative mx-auto max-w-4xl">
                    {/* Connecting Vertical Line */}
                    <div className="hidden md:block absolute top-10 bottom-10 left-1/2 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-emerald-300 -translate-x-1/2 z-0"></div>

                    <div className="space-y-16">
                        {steps.map((step, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                {/* Timeline Node (Desktop) */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white border-4 border-slate-100 shadow-md items-center justify-center">
                                    <div className={`w-4 h-4 rounded-full ${step.bg.replace('100', '400')} animate-pulse`}></div>
                                </div>

                                {/* Content Card */}
                                <div className="w-full md:w-1/2 group">
                                    <div className={`relative p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform ${idx % 2 === 0 ? 'md:mr-12 hover:-translate-x-2' : 'md:ml-12 hover:translate-x-2'}`}>

                                        {/* Decorative number watermark */}
                                        <div className="absolute top-4 right-6 text-8xl font-black text-slate-50 opacity-50 group-hover:text-slate-100 transition-colors duration-300 pointer-events-none select-none">
                                            {idx + 1}
                                        </div>

                                        <div className="relative z-10">
                                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg} mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                                <span className={`material-symbols-outlined text-3xl ${step.color}`}>{step.icon}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                            <p className="text-slate-600 leading-relaxed text-lg">{step.subtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
