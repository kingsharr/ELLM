'use client';

import { useState } from 'react';
import clsx from 'clsx';

const rewards = [
  '🎁 50 Bonus Points!',
  '🏅 New Badge Unlocked!',
  '🧠 Fun Fact: Recycling 1 can saves energy!',
  '🌱 Virtual Tree Planted!',
  '❌ Try Again Tomorrow!',
];

// New color palette without greens
const rewardColors = ['#E11D48', '#C026D3', '#5ca9f6', '#3B82F6', '#F59E0B'];

export default function SpinWheel() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning || hasSpun) return;

    const slice = 360 / rewards.length;
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const newAngle = 360 * 5 + (360 - slice * randomIndex - slice / 2);

    setSpinning(true);
    setAngle(newAngle);
    setTimeout(() => {
      setResult(rewards[randomIndex]);
      setSpinning(false);
      setHasSpun(true);
    }, 3000);
  };

  // Create conic-gradient style dynamically
  const gradient = `conic-gradient(${rewards
    .map((_, i) => `${rewardColors[i]} ${i * (100 / rewards.length)}% ${(i + 1) * (100 / rewards.length)}%`)
    .join(', ')})`;

  return (
    <div className="flex flex-col items-center mt-12 px-4 text-white">
      <h2 className="text-3xl font-bold mb-6">🎯 Mystery Spinner</h2>

      <div className="relative w-72 h-72">
        {/* Wheel */}
        <div
          className="w-full h-full rounded-full border-[10px] border-purple-600 shadow-xl"
          style={{
            background: gradient,
            transform: `rotate(${angle}deg)`,
            transition: 'transform 3s ease-out',
          }}
        />

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[18px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-red-600 z-10" />
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning || hasSpun}
        className={clsx(
          'mt-8 px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition duration-300',
          spinning || hasSpun
            ? 'bg-gray-500 cursor-not-allowed text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        )}
      >
        {spinning ? 'Spinning...' : hasSpun ? 'Already Spun' : '🎉 Spin Now!'}
      </button>

      {/* Result */}
      {result && !spinning && (
        <div className="mt-6 p-4 bg-white text-black rounded-xl shadow-md text-center text-lg max-w-sm animate-fade-in">
          <strong>{result}</strong>
        </div>
      )}

      {/* Color Legend */}
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-bold mb-3">Color Legend</h3>
        <ul className="space-y-2">
          {rewards.map((reward, index) => (
            <li key={index} className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: rewardColors[index] }}></div>
              <span>{reward}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}