import { FaUser, FaHistory, FaAward } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaUser className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Profile</h1>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          {/* Profile form */}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory className="text-green-600" />
            <h2 className="text-xl font-semibold">Recycling History</h2>
          </div>
          {/* History component */}
          
          <div className="flex items-center gap-2 mt-8 mb-4">
            <FaAward className="text-green-600" />
            <h2 className="text-xl font-semibold">Achievements</h2>
          </div>
          {/* Achievements component */}
        </div>
      </div>
    </section>
  )
}