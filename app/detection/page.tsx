import { FaCamera } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";

export default function DetectionPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaCamera className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Waste Detection</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Upload an image of your waste item and our AI will classify it and tell you how to properly dispose of it.
      </p>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <ImageUpload />
      </div>
    </section>
  );
}