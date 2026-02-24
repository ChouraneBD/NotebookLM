export default function Features() {
    const features = [
        {
            title: "AI-Powered Simulations",
            description: "Generates practice exams that mimic real AP & SAT conditions, completely customized to your notes and study materials.",
            icon: "bolt",
            color: "from-blue-500 to-indigo-600",
            bg: "bg-blue-50 text-blue-600",
            span: "md:col-span-2 md:row-span-2"
        },
        {
            title: "Instant Detailed Feedback",
            description: "Stop waiting for results. Get comprehensive explanations for every answer immediately after submission to understand your mistakes.",
            icon: "check_circle",
            color: "from-emerald-400 to-teal-500",
            bg: "bg-emerald-50 text-emerald-600",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            title: "Adaptive Flashcards",
            description: "Automatically turn your weak spots into personalized flashcards using proven spaced repetition algorithms.",
            icon: "style",
            color: "from-purple-500 to-pink-500",
            bg: "bg-purple-50 text-purple-600",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            title: "Progress Analytics",
            description: "Track your improvement over time with detailed dashboards identifying which topics need more focus.",
            icon: "monitoring",
            color: "from-amber-400 to-orange-500",
            bg: "bg-orange-50 text-orange-600",
            span: "md:col-span-2 md:row-span-1"
        }
    ]

    return (
        <section id="features" className="bg-white py-24 sm:py-32 relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center mb-20">
                    <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Power Your Prep</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">excel</span>
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Moraja3aAI gives you unfair academic advantages using entirely customized, AI-driven study paths.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 auto-rows-[minmax(250px,auto)] gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${feature.span}`}
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col justify-start h-full">
                                <div className={`inline-flex items-center justify-center rounded-2xl w-14 h-14 mb-8 ${feature.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed max-w-md">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative element for large cards */}
                            {feature.span.includes('col-span-2') && (
                                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500 pointer-events-none">
                                    <span className="material-symbols-outlined text-[200px]">{feature.icon}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
