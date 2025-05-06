"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Head from 'next/head';

export default function ChatbotPage() {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([
    {
      role: 'assistant',
      content: 'Ask me anything about recycling and waste management!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter(); // Initialize useRouter

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission and call Hugging Face API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: { role: "user"; content: string } = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer YOUR_API_KEY', // Replace with your actual API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: input,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Error: ${errorText || 'Failed to get response from the API'}`,
          },
        ]);
        throw new Error(errorText || 'Failed to get response');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data[0]?.generated_text || 'No response' },
      ]);
    } catch (error: any) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Recycling Chatbot</title>
        <meta
          name="description"
          content="Ask questions about recycling and waste management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-green-800 p-6 text-white text-center relative">
        <h1 className="text-4xl font-bold">Ask Our LLM Chatbot</h1>
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-bold shadow-md transition duration-200"
        >
          Home Page
        </button>
      </header>

      <div className="bg-green-500 p-6">
        <h2 className="text-2xl font-bold text-white">LLM Chatbot</h2>
        <p className="text-white text-lg">
          Ask me anything about recycling and waste management!
        </p>
      </div>

      <div className="flex-1 bg-slate-700 p-4 overflow-y-auto">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-xs md:max-w-md ${
                message.role === 'user'
                  ? 'ml-auto bg-green-500'
                  : 'mr-auto bg-slate-600'
              } rounded-lg p-3 text-white`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="mr-auto bg-slate-600 rounded-lg p-3 text-white">
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-l text-black dark:text-white dark:bg-gray-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-r font-bold"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}