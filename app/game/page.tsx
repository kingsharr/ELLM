"use client";

import { useState } from 'react';
import { FaGamepad, FaTrophy, FaRecycle } from 'react-icons/fa';
import Leaderboard from '@/components/Leaderboard';

type WasteType = 'plastic' | 'paper' | 'food';

const GamePage = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [lastUser, setLastUser] = useState<string | null>(null);
  const [wasteCategory, setWasteCategory] = useState<{ [key in WasteType]: number }>({
    plastic: 0,
    paper: 0,
    food: 0,
  });

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const wasteType = (form.wasteType as HTMLSelectElement).value as WasteType;
    const weight = parseFloat((form.weight as HTMLInputElement).value);
    const userId = (form.userId as HTMLInputElement).value;

    setLastUser(userId);

    let pointsPerKg = wasteType === 'plastic' ? 10 : wasteType === 'paper' ? 8 : 5;
    const earnedPoints = Math.round(pointsPerKg * weight);
    const newTotalPoints = totalPoints + earnedPoints;
    const newTotalWeight = totalWeight + weight;

    setTotalPoints(newTotalPoints);
    setTotalWeight(newTotalWeight);

    setWasteCategory(prev => ({
      ...prev,
      [wasteType]: prev[wasteType] + weight,
    }));

    const newBadges: string[] = [];
    if (newTotalPoints >= 500 && !badges.includes('Recycler 500')) newBadges.push('Recycler 500');
    if (newTotalWeight >= 100 && !badges.includes('Waste Warrior')) newBadges.push('Waste Warrior');
    setBadges(prev => [...prev, ...newBadges.filter(b => !prev.includes(b))]);

    setLog(prev => [`User ${userId}: ${wasteType} (${weight}kg) → +${earnedPoints} pts`, ...prev.slice(0, 4)]);
    form.reset();
  };

  const pointsProgress = Math.min((totalPoints / 500) * 100, 100);
  const weightProgress = Math.min((totalWeight / 100) * 100, 100);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaGamepad className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Recycling Game</h1>
      </div>

      {lastUser && (
        <p className="text-md text-gray-500 mb-4">
          👋 Welcome back, <span className="font-semibold text-green-600">User {lastUser}</span>! Keep recycling!
        </p>
      )}

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Earn points, unlock badges, and compete by sorting waste correctly!
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        
        
        {/* Left Section: Your Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" /> Recycling Details
          </h2>






          {/* Form and other elements */}
          <form onSubmit={handleScan} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">User ID:</label>
              <input type="text" name="userId" required className="p-3 rounded border dark:bg-gray-700" />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Waste Type:</label>
              <select name="wasteType" required className="p-3 rounded border dark:bg-gray-700">
                <option value="">Select Waste Type</option>
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                <option value="food">Food Waste</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Weight (kg):</label>
              <input type="number" name="weight" step="0.1" required className="p-3 rounded border dark:bg-gray-700" />
            </div>

            <button type="submit" className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700 transition">
              Simulate Scan
            </button>
          </form>

          <ul className="mt-6 text-sm text-gray-700 dark:text-gray-300">
            {log.map((entry, i) => <li key={i}>🔄 {entry}</li>)}
          </ul>




        </div>

        {/* Right Section: New Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" /> Badges & Progress
          </h2>

          {/* Points and Weight Progress */}
          <p className="text-lg text-green-600 mb-4">Total Points: {totalPoints}</p>
          <p className="text-lg text-blue-600 mb-4">Total Waste: {totalWeight.toFixed(1)} kg</p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-800">Points Progress</label>
            <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-4 bg-green-500 rounded transition-all duration-500 ease-in-out"
                style={{ width: `${pointsProgress}%` }}
              />
            </div>
            <p className="text-xs mt-1 text-gray-600">{pointsProgress.toFixed(1)}% complete</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">Weight Progress</label>
            <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-4 bg-blue-500 rounded transition-all duration-500 ease-in-out"
                style={{ width: `${weightProgress}%` }}
              />
            </div>
            <p className="text-xs mt-1 text-gray-600">{weightProgress.toFixed(1)}% complete</p>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">🏅 Badges Unlocked:</h4>
            {badges.length ? (
              <ul className="space-y-1">
                {badges.map((badge, i) => (
                  <li
                    key={i}
                    className="text-green-700 dark:text-green-300 flex items-center gap-2 animate-bounce"
                  >
                    🏅 <span>{badge}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No badges yet. Keep scanning!</p>
            )}
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">📊 Waste Category Breakdown:</h4>
            <ul>
              {Object.keys(wasteCategory).map(cat => (
                <li key={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}: {wasteCategory[cat as WasteType]} kg
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Leaderboard />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Test Your Recycling Knowledge!
        </h2>
        <RecyclingQuiz />
      </div>
    </section>
  );
};
//
export default GamePage;

const RecyclingQuiz = () => {
  const questions = [
    {
      question: "Which material should not be placed in a recycling bin?",
      options: ["Glass", "Plastic", "Food waste", "Paper"],
      correctAnswer: "Food waste",
    },
    {
      question: "What is the main purpose of recycling?",
      options: ["Reduce waste", "Increase pollution", "Create new products", "Both A and C"],
      correctAnswer: "Both A and C",
    },

    {
      question: "What does the number inside the recycling triangle represent?",
      options: ["Type of plastic", "Recycling process", "Weight of the item", "Color of the item"],
      correctAnswer: "Type of plastic",
    },
    {
      question: "How many times can aluminum be recycled?",
      options: ["Once", "Twice", "Infinitely", "Not recyclable"],
      correctAnswer: "Infinitely",
    },


    {
      question: "Which country has the highest recycling rate?",
      options: ["Germany", "USA", "China", "India"],
      correctAnswer: "Germany",
    },
    {
      question: "What is the main benefit of recycling?",
      options: ["Saves energy", "Reduces landfill waste", "Conserves natural resources", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "What is e-waste?",
      options: ["Electronic waste", "Energy waste", "Environmental waste", "None of the above"],
      correctAnswer: "Electronic waste",
    },
    {
      question: "Which of these items can be composted?",
      options: ["Plastic bottles", "Food scraps", "Metal cans", "Glass jars"],
      correctAnswer: "Food scraps",
    },
    {
      question: "What is the recycling symbol for paper?",
      options: ["♻️", "📄", "🗑️", "📰"],
      correctAnswer: "♻️",
    },

    {
      question: "What is the best way to reduce waste?",
      options: ["Recycle", "Reuse", "Reduce", "All of the above"],
      correctAnswer: "All of the above",
    },


  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (selected: string) => {
    const isCorrect = selected === questions[current].correctAnswer;
    if (isCorrect) setScore(score + 10);

    setFeedback(isCorrect ? '✅ Correct!' : '❌ Wrong!');

    setTimeout(() => {
      setFeedback(null);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      {showResult ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Quiz Completed!</h3>
          <p className="text-green-600">Your Score: {score} / {questions.length * 10}</p>
        </div>
      ) : (
        <div>
          <p className="mb-4 font-medium">{questions[current].question}</p>
          <div className="grid gap-3">
            {questions[current].options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <p className="mt-4 text-center font-semibold text-lg">
              {feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
};




