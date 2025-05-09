'use client'

import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      content: 'Hello! I\'m your recycling assistant. Ask me anything about waste management!', 
      role: 'assistant' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Convert messages to the format expected by the API
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      
      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.reply,
        role: 'assistant'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        role: 'assistant'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Focus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg shadow-lg">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 bg-green-600 text-white rounded-t-lg">
        <FaRobot className="text-2xl" />
        <h3 className="font-semibold text-lg">Recycling Assistant</h3>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' 
              ? 'bg-green-600 text-white' 
              : 'bg-white dark:bg-gray-700 shadow'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.role === 'user' ? (
                  <FaUser className="text-sm" />
                ) : (
                  <FaRobot className="text-sm text-green-500" />
                )}
                <span className="text-xs font-medium">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <FaRobot className="text-sm text-green-500" />
                <span className="text-xs font-medium">Assistant</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-lg">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about recycling..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`bg-green-600 text-white rounded-full p-3 transition ${
              isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}