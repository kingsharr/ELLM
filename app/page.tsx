// app/(main)/page.tsx
import { FaRecycle, FaRobot, FaChartLine, FaGamepad, FaLeaf } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-6">
          Transforming Waste Management with <span className="text-green-600 dark:text-green-400">AI & LLM Technology</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          SmartWaste ELLM leverages cutting-edge artificial intelligence and large language models to revolutionize how Malaysia handles waste.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/detection" 
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition font-medium"
          >
            Try Waste Detection
          </Link>
          <Link 
            href="/chatbot" 
            className="border border-green-600 text-green-600 dark:text-green-300 px-6 py-3 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition font-medium"
          >
            Ask Our Chatbot
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaRobot className="text-4xl text-green-600" />,
              title: "AI Waste Scanner",
              desc: "Instant classification through your camera",
              link: "/detection"
            },
            {
              icon: <FaRecycle className="text-4xl text-green-600" />,
              title: "LLM Chatbot",
              desc: "Get answers about recycling rules",
              link: "/chatbot"
            },
            {
              icon: <FaChartLine className="text-4xl text-green-600" />,
              title: "Predictive Analytics",
              desc: "Optimized collection routes",
              link: "/prediction"
            },
            {
              icon: <FaGamepad className="text-4xl text-green-600" />,
              title: "Gamified Experience",
              desc: "Earn rewards for recycling",
              link: "/game"
            },
            {
              icon: <FaLeaf className="text-4xl text-green-600" />,
              title: "Environmental Impact",
              desc: "Track your positive contribution",
              link: "/profile"
            }
          ].map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "30%+", label: "Recycling Rate Improvement" },
              { value: "50%", label: "Collection Cost Reduction" },
              { value: "10K+", label: "Users Educated" }
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}