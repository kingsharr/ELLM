"use client";

import { useState } from 'react';
import { FaTrophy, FaRecycle, FaLeaf, FaTree, FaAward } from 'react-icons/fa';
import { MdRecycling, MdNature, MdEco } from 'react-icons/md';
import Leaderboard from '@/components/Leaderboard';
import SpinWheel from '@/components/SpinWheel';

type WasteType = 'plastic' | 'paper' | 'food';

const GamePage = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [isUserIdLocked, setIsUserIdLocked] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0); // RM balance
  const [wasteCategory, setWasteCategory] = useState<{ [key in WasteType]: number }>(
    { plastic: 0, paper: 0, food: 0 }
  );

  const handleSetUserId = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newUserId = (form.userId as HTMLInputElement).value;

    if (newUserId.trim()) {
      setUserId(newUserId);
      setIsUserIdLocked(true);
      form.reset();
    }
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const wasteType = (form.wasteType as HTMLSelectElement).value as WasteType;
    const weight = parseFloat((form.weight as HTMLInputElement).value);

    const pointsPerKg = wasteType === 'plastic' ? 10 : wasteType === 'paper' ? 8 : 5;
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

    const cashReward = weight * 0.2;
    setWalletBalance(prev => parseFloat((prev + cashReward).toFixed(2)));

    setLog(prev => [
      `User ${userId}: ${wasteType} (${weight}kg) → +${earnedPoints} pts`,
      ...prev.slice(0, 4),
    ]);
    form.reset();
  };

  const handleChangeUser = () => {
    setIsUserIdLocked(false);
    setUserId('');
  };

  const pointsProgress = Math.min((totalPoints / 500) * 100, 100);
  const weightProgress = Math.min((totalWeight / 100) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-600 p-3 rounded-full shadow-lg">
            <MdRecycling className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300">
            EcoChampion <span className="text-purple-500">Recycling Game</span>
          </h1>
        </div>
          {userId && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8 border-l-4 border-purple-500 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                <FaAward className="text-xl text-purple-600 dark:text-purple-300" />
              </div>
              <p className="text-md">
                👋 Welcome, <span className="font-semibold text-purple-600 dark:text-purple-300">User {userId}</span>! Keep recycling to earn more rewards!
              </p>
            </div>
            <button 
              onClick={handleChangeUser} 
              className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 font-medium py-1.5 px-3 rounded-lg transition-colors"
            >
              Change User
            </button>
          </div>
        )}

        <p className="text-lg text-indigo-700 dark:text-indigo-300 mb-8 font-medium">
          Join our mission to make Earth greener! Earn points, unlock badges, and win exciting rewards by recycling waste properly. 
          <span className="block mt-2 text-purple-600 dark:text-purple-400 font-semibold">Every small action counts towards a cleaner planet! 🌍</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section - Recycling Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-indigo-500 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
              <FaRecycle className="text-indigo-500" /> Recycle & Earn
            </h2>

            {!isUserIdLocked ? (
              <form onSubmit={handleSetUserId} className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                    <span className="bg-indigo-100 dark:bg-indigo-900 p-1 rounded-md mr-2">👤</span> User ID:
                  </label>
                  <input 
                    type="text" 
                    name="userId" 
                    required 
                    className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-700 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    placeholder="Enter your ID"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-full py-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  👤 Set User ID
                </button>
              </form>
            ) : (
              <form onSubmit={handleScan} className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                    <span className="bg-indigo-100 dark:bg-indigo-900 p-1 rounded-md mr-2">🗑️</span> Waste Type:
                  </label>
                  <select 
                    name="wasteType" 
                    required 
                    className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-700 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  >
                    <option value="">Select Waste Type</option>
                    <option value="plastic">♻️ Plastic</option>
                    <option value="paper">📄 Paper</option>
                    <option value="food">🍎 Food Waste</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                    <span className="bg-indigo-100 dark:bg-indigo-900 p-1 rounded-md mr-2">⚖️</span> Weight (kg):
                  </label>
                  <input 
                    type="number" 
                    name="weight" 
                    step="0.1" 
                    required 
                    className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-700 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    placeholder="Enter weight"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-full py-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  🔄 Scan & Get Rewards
                </button>
              </form>
            )}

            <div className="mt-6 bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <FaLeaf className="text-indigo-500" /> Recent Activity
              </h4>
              <ul className="divide-y divide-indigo-100 dark:divide-gray-600">
                {log.map((entry, i) => (
                  <li key={i} className="py-2 text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">🔄</span> {entry}
                  </li>
                ))}
                {log.length === 0 && (
                  <li className="py-2 text-gray-500 italic">No activity yet. Start recycling!</li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Section - Progress & Badges */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <FaTrophy className="text-yellow-500" /> Your Achievements
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 p-4 rounded-xl text-center">
                <p className="text-indigo-500 dark:text-indigo-300 font-medium">Total Points</p>
                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-200">{totalPoints}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 p-4 rounded-xl text-center">
                <p className="text-purple-500 dark:text-purple-300 font-medium">Waste Recycled</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">{totalWeight.toFixed(1)} kg</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-4 rounded-xl text-center">
                <p className="text-blue-500 dark:text-blue-300 font-medium">TNG Wallet</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">RM {walletBalance.toFixed(2)}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Points Progress</label>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{pointsProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${pointsProgress}%` }} 
                />
              </div>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                {500 - totalPoints > 0 ? `${500 - totalPoints} more points to reach Recycler 500` : 'Recycler 500 achieved!'}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Weight Progress</label>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">{weightProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${weightProgress}%` }} 
                />
              </div>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                {100 - totalWeight > 0 ? `${(100 - totalWeight).toFixed(1)} kg more to reach Waste Warrior` : 'Waste Warrior achieved!'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                  <FaAward className="text-yellow-500" /> Badges Unlocked
                </h4>
                {badges.length ? (
                  <ul className="space-y-2">
                    {badges.map((badge, i) => (
                      <li key={i} className="bg-white dark:bg-gray-600 p-2 rounded-lg shadow-sm text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                        <span className="text-yellow-500">🏅</span> {badge}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No badges yet. Keep recycling!</p>
                )}
              </div>

              <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-purple-700 dark:text-purple-300 flex items-center gap-2">
                  <MdNature className="text-green-500" /> Waste Breakdown
                </h4>
                <ul className="space-y-2">
                  {Object.keys(wasteCategory).map(cat => (
                    <li key={cat} className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        {cat === 'plastic' ? '♻️' : cat === 'paper' ? '📄' : '🍎'} 
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}:
                      </span>
                      <span className="font-medium">{wasteCategory[cat as WasteType]} kg</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mystery Reward Spinner */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-800 dark:to-indigo-900 rounded-xl shadow-lg p-6 col-span-2 mt-6 border border-purple-200 dark:border-purple-800">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700 dark:text-purple-300 flex items-center justify-center gap-2">
              <span className="text-3xl">🎁</span> Mystery Reward Spinner <span className="text-3xl">✨</span>
            </h2>
            <p className="text-center text-purple-600 dark:text-purple-400 mb-6">Spin the wheel to get exciting rewards!</p>
            <SpinWheel />
          </div>

          {/* Quiz Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-blue-900 rounded-xl shadow-lg p-6 mt-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
              <FaTree className="text-green-600" /> Test Your Recycling Knowledge!
            </h2>
            <p className="text-blue-600 dark:text-blue-400 mb-4">Take the quiz and earn RM0.10 for each correct answer!</p>
            <RecyclingQuiz onReward={() => setWalletBalance(prev => parseFloat((prev + 0.10).toFixed(2)))} />
          </div>

          {/* Leaderboard */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-blue-900 rounded-xl shadow-lg p-6 mt-6 border border-blue-200 dark:border-blue-800">
            <Leaderboard />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-indigo-600 dark:text-indigo-400 font-medium">
            <MdEco className="inline text-xl text-green-500 mr-1" /> 
            Join our mission to make Earth cleaner and greener. Every recycling action counts!
          </p>
        </div>
      </section>
    </div>
  );
};

export default GamePage;

interface QuizProps {
  onReward: () => void;
}

const RecyclingQuiz = ({ onReward }: QuizProps) => {
  const questions = [
    { question: "Which material should not be placed in a recycling bin?", options: ["Glass", "Plastic", "Food waste", "Paper"], correctAnswer: "Food waste" },
    { question: "What is the main purpose of recycling?", options: ["Reduce waste", "Increase pollution", "Create new products", "Both A and C"], correctAnswer: "Both A and C" },
    { question: "What does the number inside the recycling triangle represent?", options: ["Type of plastic", "Recycling process", "Weight of the item", "Color of the item"], correctAnswer: "Type of plastic" },
    { question: "How many times can aluminum be recycled?", options: ["Once", "Twice", "Infinitely", "Not recyclable"], correctAnswer: "Infinitely" },
    { question: "Which country has the highest recycling rate?", options: ["Germany", "USA", "China", "India"], correctAnswer: "Germany" },
    { question: "What is the main benefit of recycling?", options: ["Saves energy", "Reduces landfill waste", "Conserves natural resources", "All of the above"], correctAnswer: "All of the above" },
    { question: "What is e-waste?", options: ["Electronic waste", "Energy waste", "Environmental waste", "None of the above"], correctAnswer: "Electronic waste" },
    { question: "Which of these items can be composted?", options: ["Plastic bottles", "Food scraps", "Metal cans", "Glass jars"], correctAnswer: "Food scraps" },
    { question: "What is the recycling symbol for paper?", options: ["♻️", "📄", "🗑️", "📰"], correctAnswer: "♻️" },
    { question: "What is the best way to reduce waste?", options: ["Recycle", "Reuse", "Reduce", "All of the above"], correctAnswer: "All of the above" },
  
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (selected: string) => {
    const isCorrect = selected === questions[current].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10);
      onReward();
    }

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
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
      {showResult ? (
        <div className="text-center p-6">
          <div className="text-5xl mb-4">{score >= 70 ? '🏆' : '🎮'}</div>
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Quiz Completed!</h3>
          <p className="text-lg mt-2">
            Your Score: <span className="font-bold text-blue-600 dark:text-blue-400">{score} / {questions.length * 10}</span>
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {score >= 80 ? 'Excellent! You\'re a recycling expert!' : 
             score >= 60 ? 'Well done! You know your recycling facts!' : 
             'Keep learning about recycling!'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              Question {current + 1}/{questions.length}
            </span>
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
              Score: {score}
            </span>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <p className="mb-2 font-medium text-lg text-blue-800 dark:text-blue-200">{questions[current].question}</p>
          </div>
          
          <div className="grid gap-3">
            {questions[current].options.map((option, index) => (
              <button
                key={index}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          
          {feedback && (
            <div className={`mt-4 text-center font-semibold text-lg p-2 rounded-lg ${
              feedback.includes('✅') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};