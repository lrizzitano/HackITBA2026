// services/gemini.js

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function generar(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
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