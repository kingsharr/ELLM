import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialize OpenAI client with the new SDK format
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define types for better type safety
type RequestBody = {
  message: string;
  conversationHistory?: Array<{ role: "user" | "assistant" | "system"; content: string }>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request received:", req.method);

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API key");
    return res.status(500).json({
      error: "Server configuration error: Missing OpenAI API key. Please set it in your .env.local file.",
    });
  }

  try {
    // Get the message from the request body
    const { message, conversationHistory = [] } = req.body as RequestBody;

    console.log("Message received:", message);

    // Validate input
    if (!message || typeof message !== "string") {
      console.error("Invalid message format");
      return res.status(400).json({ error: "Valid message is required" });
    }

    // Prepare conversation messages with correct typing for OpenAI SDK
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: "You are a helpful assistant specializing in recycling and waste management." },
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    console.log("Calling OpenAI API...");

    // Call OpenAI API with the new SDK format
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      throw new Error("No reply received from OpenAI");
    }

    console.log("Reply generated successfully");
    return res.status(200).json({
      reply,
      usage: response.usage,
    });
  } catch (error: any) {
    console.error("Error with OpenAI API:", error);

    // Detailed error handling for different types of errors
    if (error.status === 401) {
      return res.status(500).json({
        error: "Invalid API key. Please check your OpenAI API key configuration."
      });
    } else if (error.status === 429) {
      return res.status(500).json({
        error: "OpenAI rate limit reached or insufficient quota. Please check your billing status."
      });
    }

    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.error?.message || error.message || "Failed to fetch response from OpenAI";

    return res.status(statusCode).json({
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? error.toString() : undefined,
    });
  }
}