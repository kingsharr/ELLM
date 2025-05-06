'use client'

import { useState } from 'react';
import { FaTrashAlt, FaRoute, FaCalendarAlt } from 'react-icons/fa';

const locations = [
  { id: 1, name: "Taman Tun Dr Ismail", fillLevel: 78, lastCollected: "2 days ago" },
  { id: 2, name: "Bangsar South", fillLevel: 45, lastCollected: "1 day ago" },
  { id: 3, name: "Damansara Heights", fillLevel: 92, lastCollected: "3 days ago" },
  { id: 4, name: "Mont Kiara", fillLevel: 63, lastCollected: "1 day ago" },
];

export default function PredictionMap() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const getFillColor = (level: number) => {
    if (level > 80) return 'bg-red-500';
    if (level > 60) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Map Visualization (simplified) */}
        <div className="md:col-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <div className="relative h-64 bg-green-50 rounded-lg border border-green-200">
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`absolute ${getFillColor(loc.fillLevel)} text-white rounded-full w-8 h-8 flex items-center justify-center 
                  ${loc.id === 1 ? 'top-1/4 left-1/4' : ''}
                  ${loc.id === 2 ? 'top-1/3 right-1/3' : ''}
                  ${loc.id === 3 ? 'bottom-1/4 left-1/3' : ''}
                  ${loc.id === 4 ? 'top-2/5 right-1/4' : ''}
                  ${selectedLocation === loc.id ? 'ring-4 ring-green-300' : ''}
                `}
              >
                <FaTrashAlt />
              </button>
            ))}
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Collection Points</h3>
          {selectedLocation ? (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h4 className="font-medium">
                {locations.find(l => l.id === selectedLocation)?.name}
              </h4>
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getFillColor(
                    locations.find(l => l.id === selectedLocation)?.fillLevel || 0
                  )}`}></div>
                  <span>
                    {locations.find(l => l.id === selectedLocation)?.fillLevel}% full
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaCalendarAlt />
                  Last collected: {locations.find(l => l.id === selectedLocation)?.lastCollected}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a location on the map</p>
          )}

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <FaRoute className="text-green-600" />
              Recommended Collection Route
            </h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Taman Tun Dr Ismail (High Priority)</li>
              <li>Damansara Heights (High Priority)</li>
              <li>Mont Kiara</li>
              <li>Bangsar South</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-medium mb-3">Collection Schedule</h3>
        <div className="grid grid-cols-7 gap-2 text-sm">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center">
              <div className="font-medium">{day}</div>
              <div className={`h-2 mx-1 mt-1 rounded-full ${
                ['Tue', 'Thu', 'Sat'].includes(day) 
                  ? 'bg-green-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}