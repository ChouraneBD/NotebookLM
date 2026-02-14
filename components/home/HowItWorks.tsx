export default function HowItWorks() {
    const steps = [
        { title: "Upload Notes", subtitle: "PDF, Text, or Paste" },
        { title: "Take Test", subtitle: "AI Generates Questions" },
        { title: "Master Topics", subtitle: "Get Flashcards for Weak Spots" }
    ]

    return (
        <section id="how-it-works" className="bg-gray-50 py-24 sm:py-32 border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-[var(--primary-color)]">Simple Process</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From Notes to Mastery in 3 Steps</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gray-200 -z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center bg-gray-50 md:bg-transparent">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-indigo-50 shadow-sm text-2xl font-bold text-[var(--primary-color)] mb-6 z-10">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-500">{step.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
