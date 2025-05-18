"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import Chatbot from "../../components/Chatbot";

export default function ChatbotPage() {
  // const router = useRouter(); // Not needed if no header button

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Recycling Chatbot</title>
        <meta
          name="description"
          content="Ask questions about recycling and waste management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
