import { useState } from 'react';
import clsx from 'clsx';

const rewards = [
  '🎁 50 Bonus Points!',
  '🏅 New Badge Unlocked!',
  '🧠 Eco Fact: Recycling 1 can saves enough energy to power a TV for 3 hours!',
  '🌱 Virtual Plant Added!',
  '❌ Try Again Tomorrow!',
];

export default function SpinWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [angle, setAngle] = useState(0);
  const [hasSpun, setHasSpun] = useState(false); // Track if the user has spun

  const spin = () => {
    if (spinning || hasSpun) return; // Prevent spinning if already spun

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const newAngle = 360 * 5 + (360 / rewards.length) * randomIndex;

    setAngle(newAngle);
    setTimeout(() => {
      setResult(rewards[randomIndex]);
      setSpinning(false);
      setHasSpun(true); // Mark the user as having spun
    }, 2500); // Reduced spin duration for faster spin
  };

  return (
    <div className="flex flex-col items-center mt-10 font-sans">
      <div className="relative w-72 h-72 rounded-full border-8 border-green-500 shadow-lg overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
        <div
          className="absolute inset-0 transition-transform duration-[1.5s] ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {rewards.map((reward, i) => (
            <div
              key={i}
              className={clsx(
                'absolute w-1/2 h-1/2 flex items-center justify-end pr-6 text-white font-bold text-2xl',
                i % 2 === 0 ? 'bg-green-600' : 'bg-blue-700'
              )}
              style={{
                transform: `rotate(${(360 / rewards.length) * i}deg)`,
                transformOrigin: '100% 100%',
              }}
            >
              <div
                style={{ transform: `rotate(${(360 / rewards.length) / -2}deg)` }}
              >
                {reward.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-red-600" />
      </div>

      <button
        className={clsx(
          'mt-6 px-8 py-3 text-lg font-bold rounded-full transition',
          spinning || hasSpun
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white shadow-md'
        )}
        onClick={spin}
        disabled={spinning || hasSpun} // Disable button if already spun or spinning
      >
        {spinning ? 'Spinning...' : hasSpun ? 'You have spun already!' : '🎯 Spin the Wheel!'}
      </button>

      {result && !spinning && (
        <div className="mt-6 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-lg text-xl animate-bounce text-center w-4/5 max-w-md">
          🎉 <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}


