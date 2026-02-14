export default function Features() {
    const features = [
        {
            title: "AI-Powered Simulations",
            description: "Generates practice exams that mimic real AP & SAT conditions, customized to your notes.",
            icon: "bolt"
        },
        {
            title: "Instant Feedback",
            description: "No more waiting. Get detailed explanations for every answer immediately after submission.",
            icon: "check_circle"
        },
        {
            title: "Adaptive Study Mode",
            description: "Turn your weak spots into personalized flashcards automatically using spacing algorithms.",
            icon: "school"
        }
    ]

    return (
        <section className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group relative bg-[var(--surface-color)] p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="mx-auto md:mx-0 flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors mb-6">
                                <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">{feature.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary-color)] transition-colors">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
