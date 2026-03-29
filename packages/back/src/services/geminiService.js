// services/gemini.js
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_GEMINI
});

export async function generar(prompt) {
  let  response;
  try {
    response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });
  } catch (error) {
    console.error("Error al generar contenido con Gemini:", error);
    throw new Error("Error al generar contenido con Gemini");
  }

  const text = response.text;

  if (!text) {
    throw new Error('Respuesta vacía de Gemini');
  }

  return text;
}