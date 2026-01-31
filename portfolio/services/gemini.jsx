
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getAIResponse = async (userPrompt) => {
  if (!API_KEY) return "API Key not configured.";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are the AI assistant for Sandipto Roy's professional portfolio.
    Sandipto Roy is a CSE student at NIT Durgapur and an incoming intern at Goldman Sachs.
    
    Sandipto's Profile:
    - Education: NIT Durgapur (CSE)
    - Achievement: Secured a summer internship at Goldman Sachs.
    - Skills: DSA, Competitive Programming, Full-stack Web Dev (React, Node).
    - Platforms: Active on CodeChef (5*), Codeforces (Expert), LeetCode (Guardian).
    - Hobbies: Photography, Football, Classical Music.
    
    Website theme: Elegant Red and Black.
    Tone: Professional, intelligent, and helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while connecting to the AI service.";
  }
};
