"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Chatbot() {
  const router = useRouter(); // For navigation
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply || "Sorry, I couldn't process that." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "bot", text: "Something went wrong. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-gray-100 dark:from-green-900 dark:to-gray-900">
      {/* Header */}
      <div className="bg-green-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h2 className="text-lg font-bold">LLM Chatbot</h2>
        <button
          onClick={() => router.push("/")} // Navigate back to the main page
          className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Back to Main Page
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 border-t border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400"
        />
        <button
          onClick={handleSend}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}