import { NextApiRequest, NextApiResponse } 
from "next";

// Define types for better type safety
type RequestBody = {
  message: string;
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
  modelId?: string; // Add model ID for model selection
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request received:", req.method);

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate API key
  if (!process.env.HUGGINGFACE_API_KEY) {
    console.error("Missing Hugging Face API key");
    return res.status(500).json({
      error: "Server configuration error: Missing Hugging Face API key. Please set it in your .env.local file.",
    });
  }

  try {
    // Get the message from the request body
    const { message, conversationHistory = [], modelId } = req.body as RequestBody;

    console.log("Message received:", message);

    // Validate input
    if (!message || typeof message !== "string") {
      console.error("Invalid message format");
      return res.status(400).json({ error: "Valid message is required" });
    }

    // Set the model to use
    // Use the model from the request, fall back to env var, then default
    const MODEL_ID = modelId || process.env.HF_MODEL_ID || "mistralai/Mistral-7B-Instruct-v0.2";
    
    // Create prompt from conversation history for context
    let prompt = "";
    
    // Add system message for context
    prompt += "You are a helpful assistant specializing in recycling and waste management. You provide accurate and helpful information about proper disposal methods, recycling practices, composting, and reducing waste. Keep responses informative and practical.\n\n";
    
    // Add conversation history to the prompt
    conversationHistory.forEach(msg => {
      prompt += `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}\n`;
    });
    
    // Add the current message
    prompt += `Human: ${message}\nAssistant:`;

    console.log("Calling Hugging Face API for model:", MODEL_ID);

    // Call Hugging Face API
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
          }
        }),
      }
    );

    const responseText = await response.text();
    
    try {
      // Try to parse as JSON
      const data = JSON.parse(responseText);
      
      let reply = data[0]?.generated_text || "";
      
      // Extract only the assistant's response
      reply = reply.split("Assistant:").pop() || "";
      
      // Clean up the response if needed
      reply = reply.trim();

      console.log("Reply generated successfully");
      return res.status(200).json({
        reply,
      });
    } catch (parseError) {
      console.error("Failed to parse Hugging Face response as JSON:", responseText);
      throw new Error("Invalid response from Hugging Face API: " + responseText.substring(0, 100));
    }
  } catch (error: any) {
    console.error("Error with Hugging Face API:", error);

    // Detailed error handling for different types of errors
    if (error.message.includes("401")) {
      return res.status(500).json({
        error: "Invalid API key. Please check your Hugging Face API key configuration."
      });
    } else if (error.message.includes("429")) {
      return res.status(500).json({
        error: "Hugging Face rate limit reached. Please try again later."
      });
    }

    return res.status(500).json({
      error: "Failed to fetch response from Hugging Face",
      details: process.env.NODE_ENV === "development" ? error.toString() : undefined,
    });
  }
}