import Chatbot from "@/components/Chatbot"; 

export const metadata = {
  title: "Recycling FAQ",
  description: "Get answers to common recycling questions",
};

export default function ChatbotPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-800 p-6 text-white text-center relative">
        <h1 className="text-4xl font-bold">Recycling FAQ Center</h1>
      </header>

      <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <Chatbot />
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>© 2025 Recycling Assistant | Powered by SmartWaste My</p>
      </footer>
    </div>
  );
}
