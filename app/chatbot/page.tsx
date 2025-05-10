'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Chatbot from '../../components/Chatbot';

export default function ChatbotPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Recycling Chatbot</title>
        <meta
          name="description"
          content="Ask questions about recycling and waste management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-green-800 p-6 text-white text-center relative">
        <h1 className="text-4xl font-bold">Ask Our Recycling Assistant</h1>
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-bold shadow-md transition duration-200"
        >
          Home Page
        </button>
      </header>

      <div className="bg-green-600 p-6">
        <h2 className="text-2xl font-bold text-white">Hugging Face Powered Chatbot</h2>
        <p className="text-white text-lg">
          Ask me anything about recycling and waste management!
        </p>
      </div>

      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <Chatbot />
        </div>
      </div>

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>© 2025 Recycling Assistant | Powered by SmartWaste My</p>
      </footer>
    </div>
  );
}