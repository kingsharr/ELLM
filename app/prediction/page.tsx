import { FaChartLine, FaMapMarkerAlt } from "react-icons/fa";
import PredictionMap from "@/components/PredictionMap";

export default function PredictionPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaChartLine className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Waste Prediction</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Our predictive analytics dashboard helps municipalities optimize waste collection routes.
      </p>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <PredictionMap />
      </div>
    </section>
  )
}