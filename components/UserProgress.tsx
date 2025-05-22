import { useState } from "react";
import { FaRecycle } from "react-icons/fa";

export default function GamePage() {
  const [plasticWeight, setPlasticWeight] = useState(0);
  const [paperWeight, setPaperWeight] = useState(0);
  const [foodWeight, setFoodWeight] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const handleScan: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const wasteType = (form.wasteType as HTMLSelectElement).value;
    const weight = parseFloat((form.weight as HTMLInputElement).value);
    const userId = (form.userId as HTMLInputElement).value.trim();

    if (isNaN(weight) || weight <= 0) {
      alert("Please enter a valid weight greater than 0.");
      return;
    }
    if (!userId) {
      alert("User ID cannot be empty.");
      return;
    }

    let pointsPerKg = 0;
    let updatedPlasticWeight = plasticWeight;
    let updatedPaperWeight = paperWeight;
    let updatedFoodWeight = foodWeight;

    if (wasteType === "plastic") {
      pointsPerKg = 10;
      updatedPlasticWeight += weight;
    } else if (wasteType === "paper") {
      pointsPerKg = 8;
      updatedPaperWeight += weight;
    } else if (wasteType === "food") {
      pointsPerKg = 5;
      updatedFoodWeight += weight;
    } else {
      alert("Please select a valid waste type.");
      return;
    }

    const earnedPoints = Math.round(pointsPerKg * weight);
    setPlasticWeight(updatedPlasticWeight);
    setPaperWeight(updatedPaperWeight);
    setFoodWeight(updatedFoodWeight);
    setLog((prev) => [
      `User ${userId}: ${wasteType} (${weight}kg) → +${earnedPoints} pts`,
      ...prev.slice(0, 4),
    ]);

    form.reset();
  };


  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaRecycle className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Recycling Game
        </h1>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Earn points, badges, and compete with others by properly sorting your waste!
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Waste Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaRecycle className="text-blue-500" /> Waste Category Breakdown
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Plastic Waste:</strong> {plasticWeight} kg
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Paper Waste:</strong> {paperWeight} kg
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Food Waste:</strong> {foodWeight} kg
            </p>
          </div>
        </div>

        {/* Form and Log */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <form onSubmit={handleScan} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                User ID:
              </label>
              <input
                type="text"
                name="userId"
                placeholder="Enter your User ID"
                required
                className="w-full p-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition duration-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                Waste Type:
              </label>
              <select
                name="wasteType"
                required
                className="w-full p-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition duration-200"
              >
                <option value="">Select Waste Type</option>
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                <option value="food">Food Waste</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                Weight (kg):
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Weight in kg"
                step="0.1"
                required
                className="w-full p-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition duration-200"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-200"
              >
                Simulate Scan
              </button>
            </div>
          </form>

          {/* Log */}
          <ul className="mt-6 text-sm text-gray-700 dark:text-gray-300">
            {log.map((entry, i) => (
              <li key={i} className="mb-1">🔄 {entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}