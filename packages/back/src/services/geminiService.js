// services/gemini.js
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_GEMINI
});

export async function generar(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  });

  const text = response.text;

  if (!text) {
    throw new Error('Respuesta vacía de Gemini');
  }

  return text;
}