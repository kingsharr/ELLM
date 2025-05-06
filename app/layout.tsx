// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FaRecycle } from "react-icons/fa";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartWaste ELLM | AI-Powered Waste Management',
  description: 'Revolutionizing waste management through AI and LLM technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-gray-900">
          {/* Navigation */}
          <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
            <Link href="/" className="flex items-center space-x-2">
              <FaRecycle className="text-3xl text-green-600 dark:text-green-400" />
              <span className="text-xl font-bold text-green-800 dark:text-green-200">SmartWaste ELLM</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/detection" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Detection</Link>
              <Link href="/chatbot" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Chatbot</Link>
              <Link href="/prediction" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Prediction</Link>
              <Link href="/game" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Game</Link>
              <Link href="/profile" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Profile</Link>
            </div>
          </nav>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaRecycle className="text-2xl text-green-400" />
                  <span className="text-xl font-bold text-white">SmartWaste ELLM</span>
                </div>
                <p className="text-sm">Revolutionizing waste management through AI and LLM technology.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/detection" className="hover:text-green-400 transition">Detection</Link></li>
                  <li><Link href="/chatbot" className="hover:text-green-400 transition">Chatbot</Link></li>
                  <li><Link href="/prediction" className="hover:text-green-400 transition">Prediction</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-green-400 transition">About</Link></li>
                  <li><Link href="/blog" className="hover:text-green-400 transition">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-green-400 transition">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="hover:text-green-400 transition">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-green-400 transition">Terms</Link></li>
                  <li><Link href="/cookies" className="hover:text-green-400 transition">Cookies</Link></li>
                </ul>
              </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-sm text-center">
              <p>© {new Date().getFullYear()} SmartWaste ELLM. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}