import { FaGamepad, FaTrophy } from "react-icons/fa";
import Leaderboard from "@/components/Leaderboard";

export default function GamePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaGamepad className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Recycling Game</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Earn points, badges, and compete with others by properly sorting your waste!
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" /> Your Progress
          </h2>
          {/* User progress component */}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Leaderboard />
        </div>
      </div>
    </section>
  )
}