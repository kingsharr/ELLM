'use client'

import { useState, useRef } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I\'m your recycling assistant. Ask me anything about waste management in Malaysia.', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "In Malaysia, plastic bottles should be rinsed and placed in the recycling bin.",
        "Food waste should be separated and can be composted if possible.",
        "E-waste like old phones should be taken to special collection centers.",
        "Paper and cardboard should be dry and clean before recycling."
      ];
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b border-green-200">
        <FaRobot className="text-2xl text-green-600" />
        <h3 className="font-semibold">Recycling Assistant</h3>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'user' ? (
                  <FaUser className="text-sm" />
                ) : (
                  <FaRobot className="text-sm" />
                )}
                <span className="text-xs font-medium">
                  {message.sender === 'user' ? 'You' : 'SmartWaste'}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-green-200">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about recycling..."
            className="flex-1 border border-green-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white rounded-full p-3 hover:bg-green-700 transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}