'use client'

import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const users = [
  { id: 1, name: "Ahmad", points: 1245, level: "Gold", avatar: "👨" },
  { id: 2, name: "Mei Ling", points: 980, level: "Silver", avatar: "👩" },
  { id: 3, name: "Rajesh", points: 875, level: "Silver", avatar: "🧔" },
  { id: 4, name: "Sarah", points: 760, level: "Bronze", avatar: "👧" },
  { id: 5, name: "Ali", points: 650, level: "Bronze", avatar: "👦" },
];

export default function Leaderboard() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <FaTrophy className="text-yellow-500" />
        Community Leaderboard
      </h3>
      
      <div className="space-y-3">
        {users.map((user, index) => (
          <div 
            key={user.id} 
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              {index === 0 ? (
                <FaTrophy className="text-xl text-yellow-500" />
              ) : index === 1 ? (
                <FaMedal className="text-xl text-gray-400" />
              ) : index === 2 ? (
                <FaMedal className="text-xl text-amber-600" />
              ) : (
                <span className="w-5 text-center">{index + 1}</span>
              )}
              
              <span className="text-2xl">{user.avatar}</span>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.level}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium">{user.points}</span>
              <FaAward className="text-yellow-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Your Progress</h4>
        <div className="flex items-center justify-between mb-2">
          <span>Level 3: Eco Warrior</span>
          <span>650/1000 points</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: '65%' }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Recycle 5 more items to reach next level
        </p>
      </div>
    </div>
  );
}