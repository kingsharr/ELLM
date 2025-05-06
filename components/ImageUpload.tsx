'use client'

import { useState, useCallback } from 'react';
import { FaUpload, FaTrash, FaSpinner, FaRecycle } from 'react-icons/fa';

const wasteCategories = {
  plastic: { color: 'bg-blue-100 text-blue-800', icon: '♻️' },
  paper: { color: 'bg-amber-100 text-amber-800', icon: '📄' },
  glass: { color: 'bg-emerald-100 text-emerald-800', icon: '🥃' },
  organic: { color: 'bg-green-100 text-green-800', icon: '🍂' },
  electronic: { color: 'bg-purple-100 text-purple-800', icon: '🔌' },
  metal: { color: 'bg-gray-100 text-gray-800', icon: '🔩' }
};

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    category: keyof typeof wasteCategories;
    confidence: number;
    disposal: string;
  } | null>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        
        // Simulate AI processing
        setTimeout(() => {
          const categories = Object.keys(wasteCategories) as Array<keyof typeof wasteCategories>;
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          
          setResult({
            category: randomCategory,
            confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
            disposal: getDisposalTip(randomCategory)
          });
          setLoading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const getDisposalTip = (category: keyof typeof wasteCategories): string => {
    const tips = {
      plastic: "Rinse and place in the recycling bin",
      paper: "Keep dry and place in paper recycling",
      glass: "Separate by color if possible",
      organic: "Compost if available, otherwise general waste",
      electronic: "Bring to e-waste collection center",
      metal: "Clean and place in metal recycling"
    };
    return tips[category];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!image && (
        <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:bg-green-50 transition">
          <label className="flex flex-col items-center justify-center space-y-2">
            <FaUpload className="text-4xl text-green-500" />
            <p className="font-medium">Upload Waste Image</p>
            <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleUpload} 
            />
          </label>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="animate-spin text-3xl text-green-600 mb-4" />
          <p>Analyzing waste...</p>
        </div>
      )}

      {/* Results */}
      {image && !loading && result && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="relative">
              <img 
                src={image} 
                alt="Uploaded waste" 
                className="rounded-lg w-full max-h-80 object-contain border border-gray-200"
              />
              <button 
                onClick={() => {
                  setImage(null);
                  setResult(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Detection Results</h3>
            
            <div className={`flex items-center gap-3 p-3 rounded-lg ${wasteCategories[result.category].color}`}>
              <span className="text-2xl">{wasteCategories[result.category].icon}</span>
              <div>
                <p className="font-medium capitalize">{result.category}</p>
                <p className="text-sm">{result.confidence}% confidence</p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <FaRecycle className="text-green-600" />
                Disposal Instructions
              </h4>
              <p>{result.disposal}</p>
            </div>

            <button 
              onClick={() => {
                setImage(null);
                setResult(null);
              }}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Scan Another Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}