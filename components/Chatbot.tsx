'use client'

import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
};

// Define the component
export default function Chatbot() {
  // Hardcoded responses logic
  const getResponse = (input: string) => {
    const query = input.toLowerCase().trim();
    
    if (query === 'hi' || query === 'hello' || query === 'hey') {
      return "Hello! I'm Bob, your recycling assistant. How can I help you with waste management today?";
    }
    
    if (query.includes('recycle') || query === 'what can i recycle?') {
      return "You can recycle many items including paper, cardboard, glass bottles, aluminum cans, and certain plastics. Always check your local recycling guidelines as they may vary.";
    }
    
    if (query.includes('waste') || query === 'what is waste?') {
      return "Waste refers to any material that is unwanted or unusable. It includes solid waste (trash or garbage), liquid waste (wastewater), and gaseous waste (air pollution). Proper waste management involves strategies to reduce, reuse, recycle, and responsibly dispose of materials to minimize environmental impact.";
    }    
    
    if (query.includes('paper') || query.includes('recyclable') || query === 'can i recycle paper?') {
      return "Yes, paper is generally recyclable! Most types of paper including newspapers, magazines, office paper, cardboard, and paper packaging can be recycled. However, some paper products like paper towels, tissues, and paper contaminated with food or oil typically cannot be recycled. Always check your local recycling guidelines as they may vary.";
    }
    
    if (query.includes('compost') || query === 'what is composting?') {
      return "Composting is simple! Start with a bin or pile in your yard or use an indoor compost bin. Add 'green' materials (fruit/vegetable scraps, coffee grounds, grass clippings) and 'brown' materials (dry leaves, newspaper, cardboard) in roughly equal amounts. Keep it moist like a wrung-out sponge, turn it occasionally, and in a few months, you'll have rich compost for your garden!";
    }    
    
    if (query.includes('zero waste') || query === 'what is zero waste?') {
      return "Zero waste is a philosophy that encourages the redesign of resource life cycles so that all products are reused and no trash is sent to landfills, incinerators, or the ocean. The goal is to eliminate waste rather than manage it. This involves refusing unnecessary items, reducing consumption, reusing and repairing items, recycling materials, and composting organic matter.";
    }
    
    if (query.includes('recycling') || query === 'what is recycling?') {
      return "Recycling is the process of converting waste materials into new materials and objects. It helps reduce the consumption of fresh raw materials, decrease energy usage, lower greenhouse gas emissions, and reduce air and water pollution. Commonly recycled materials include paper, glass, metals, and certain plastics.";
    }
    
    // Default response if no matches
    return "I'm sorry, I don't have information about that yet. As Bob, I can answer questions about recycling basics, waste management, composting, paper recycling, and zero waste approaches. Feel free to ask me about these topics!";
  };

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      content: 'Hello! I\'m Bob, your recycling assistant. Ask me anything about waste management!', 
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

  const handleSend = () => {
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
    
    // Short delay to simulate processing
    setTimeout(() => {
      // Get response based on user input
      const responseContent = getResponse(input);
      
      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: 'assistant'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // Focus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg shadow-lg">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 bg-green-600 text-white rounded-t-lg">
        <FaRobot className="text-2xl" />
        <h3 className="font-semibold text-lg">Bob - Recycling Assistant</h3>
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
                  {message.role === 'user' ? 'You' : 'Bob'}
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
                <span className="text-xs font-medium">Bob</span>
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
            placeholder="Ask Bob about recycling..."
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