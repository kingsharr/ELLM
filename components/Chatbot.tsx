"use client";

import { useState, useEffect } from "react";

const FAQ: { question: string; answer: string }[] = [
  {
    question: "Can I recycle plastic bags?",
    answer:
      "Plastic bags cannot be recycled in regular curbside bins. Please take them to designated drop-off locations at grocery stores.",
  },
  {
    question: "How should I dispose of pizza boxes?",
    answer:
      "If the box is clean, you can recycle it. If it's greasy, tear off the clean parts to recycle and compost the rest.",
  },
  {
    question: "Are aluminum cans recyclable?",
    answer:
      "Yes! Aluminum cans are 100% recyclable. Please rinse them before recycling.",
  },
  {
    question: "Can I put broken glass in recycling?",
    answer:
      "No, broken glass should be wrapped securely and disposed of in regular trash for safety.",
  },
  {
    question: "Are batteries recyclable?",
    answer:
      "Batteries require special handling. Use dedicated battery recycling drop-off points, never regular bins.",
  },
  {
    question: "How do I recycle electronics?",
    answer:
      "E-waste needs special recycling. Check for local e-waste collection events or dedicated facilities.",
  },
  {
    question: "Is waxed cardboard recyclable?",
    answer:
      "Waxed cardboard (like juice cartons) can't be traditionally recycled but may be compostable.",
  },
];

export default function Chatbot() {
  const [randomQuestions, setRandomQuestions] = useState<typeof FAQ>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<(typeof FAQ)[0] | null>(null);

  useEffect(() => {
    const shuffled = [...FAQ].sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomQuestions(shuffled);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Choose a common question:
        </h3>

        {randomQuestions.map((faq, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuestion(faq)}
            className="block w-full p-3 text-left bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors text-gray-800 dark:text-white"
          >
            {faq.question}
          </button>
        ))}
      </div>

      {selectedQuestion && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">
            {selectedQuestion.question}
          </h4>
          <p className="text-green-700 dark:text-green-300">
            {selectedQuestion.answer}
          </p>
        </div>
      )}
    </div>
  );
}
