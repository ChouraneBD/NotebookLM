import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      {/* Landing Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-2xl">school</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">Moraja3aAI</span>
            </div>
            <nav className="hidden md:flex gap-8">
              {['Features', 'How it Works', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors">
                Log in
              </Link>
              <Link href="/dashboard" className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <Hero />
        <Features />
        <HowItWorks />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 grayscale opacity-70">
              <span className="material-symbols-outlined text-gray-500 text-2xl">school</span>
              <span className="text-xl font-bold tracking-tight text-gray-500">Moraja3aAI</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} Moraja3aAI. All rights reserved. Elevate your learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
