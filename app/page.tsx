import Image from "next/image";
import { FaRecycle, FaRobot, FaChartLine, FaGamepad, FaLeaf } from "react-icons/fa";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>SmartWaste ELLM | AI-Powered Waste Management</title>
        <meta name="description" content="SmartWaste ELLM combines AI and LLM technology to revolutionize waste management in Malaysia" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-gray-900">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <FaRecycle className="text-3xl text-green-600 dark:text-green-400" />
            <span className="text-xl font-bold text-green-800 dark:text-green-200">SmartWaste ELLM</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Features</a>
            <a href="#technology" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Technology</a>
            <a href="#impact" className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 font-medium">Impact</a>
            <a href="#contact" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">Learn More</a>
          </div>
        </nav>

        {/* Hero Section - Centered */}
        <section className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-6">
            Transforming Waste Management with <span className="text-green-600 dark:text-green-400">AI & LLM Technology</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            SmartWaste ELLM leverages cutting-edge artificial intelligence and large language models to revolutionize how Malaysia handles waste - from intelligent sorting to optimized collection systems.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#features" className="border border-green-600 text-green-600 dark:text-green-300 px-6 py-3 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition font-medium">
              Explore Features
            </a>
          </div>
        </section>

        {/* Problem Section */}
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Malaysia's Waste Management Challenges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "🗑️", title: "High Waste Generation", desc: "Growing urban population producing more waste" },
                { icon: "♻️", title: "Low Recycling Rates", desc: "Only 30% of waste gets recycled" },
                { icon: "❓", title: "Poor Sorting Knowledge", desc: "Public unaware of proper waste segregation" },
                { icon: "🏗️", title: "Strained Landfills", desc: "Limited space for increasing waste volumes" }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Our Smart Solution</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { 
                  icon: <FaRobot className="text-3xl text-green-600 dark:text-green-400" />,
                  title: "AI Waste Scanner", 
                  desc: "Classify waste items through your phone's camera with our advanced image recognition" 
                },
                { 
                  icon: <FaChartLine className="text-3xl text-green-600 dark:text-green-400" />,
                  title: "Predictive Analytics", 
                  desc: "Optimized waste collection routes based on historical data and fill predictions" 
                }
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {[
                { 
                  icon: <FaRecycle className="text-3xl text-green-600 dark:text-green-400" />,
                  title: "LLM Chatbot", 
                  desc: "Get instant answers about recycling rules and waste management practices" 
                },
                { 
                  icon: <FaGamepad className="text-3xl text-green-600 dark:text-green-400" />,
                  title: "Gamified Experience", 
                  desc: "Earn points and badges for proper waste sorting and recycling" 
                }
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="bg-green-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Advanced Technology Stack</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Computer Vision", 
                  desc: "Real-time waste item detection and classification using CNN models" 
                },
                { 
                  title: "LLM Integration", 
                  desc: "Natural language interface for recycling education powered by OpenAI" 
                },
                { 
                  title: "Predictive ML", 
                  desc: "Forecasting bin fill levels and optimal collection timing" 
                }
              ].map((tech, index) => (
                <div key={index} className="bg-green-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
                  <p>{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-16 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaLeaf className="text-3xl text-green-600 dark:text-green-400" />,
                title: "Environmental", 
                desc: "Reduced landfill stress and improved recycling rates" 
              },
              { 
                icon: "👥",
                title: "Social", 
                desc: "Public education and sustainable behavior change" 
              },
              { 
                icon: "💰",
                title: "Operational", 
                desc: "Cost savings for local councils through efficient collection" 
              }
            ].map((impact, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center">
                <div className="flex justify-center">
                  {impact.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-white">{impact.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{impact.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-gray-100 dark:bg-gray-800 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Ready to revolutionize waste management?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Discover how SmartWaste ELLM can transform your community's approach to waste.</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="border border-green-600 text-green-600 dark:text-green-300 px-8 py-4 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition font-medium">
                Contact for Solutions
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaRecycle className="text-2xl text-green-400" />
                <span className="text-xl font-bold text-white">SmartWaste ELLM</span>
              </div>
              <p className="text-sm">Revolutionizing waste management through AI and LLM technology.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-green-400 transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400 transition">About</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-green-400 transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-sm text-center">
            <p>© {new Date().getFullYear()} SmartWaste ELLM. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}