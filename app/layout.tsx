// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FaRecycle } from "react-icons/fa";
import Link from "next/link";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartWaste ELLM | AI-Powered Waste Management',
  description: 'Revolutionizing waste management through AI and LLM technology',
  icons: {
    icon: '/favicon.ico', 
  },
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
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Company Info */}
                <div className="md:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-2 mb-4">
                    <FaRecycle className="text-2xl text-green-400" />
                    <span className="text-xl font-bold text-white">SmartWaste ELLM</span>
                  </div>
                  <p className="text-sm text-gray-400 max-w-xs">
                    Revolutionizing waste management through AI and LLM technology.
                  </p>
                </div>

                {/* Product Links */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium mb-4 text-lg">Products</h4>
                  <ul className="space-y-3">
                    <li><Link href="/detection" className="hover:text-green-400 transition-colors flex items-center gap-2">
                      <span>Detection</span>
                    </Link></li>
                    <li><Link href="/chatbot" className="hover:text-green-400 transition-colors flex items-center gap-2">
                      <span>Chatbot</span>
                    </Link></li>
                    <li><Link href="/prediction" className="hover:text-green-400 transition-colors flex items-center gap-2">
                      <span>Prediction</span>
                    </Link></li>
                    <li><Link href="/game" className="hover:text-green-400 transition-colors flex items-center gap-2">
                      <span>Game</span>
                    </Link></li>
                  </ul>
                </div>

                {/* Additional Links */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium mb-4 text-lg">Resources</h4>
                  <ul className="space-y-3">
                    <li><Link href="/profile" className="hover:text-green-400 transition-colors">Profile</Link></li>
                  </ul>
                </div>
              </div>

              {/* Copyright */}
              <div className="pt-8 border-t border-gray-800 text-center">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} SmartWaste ELLM. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}