// Please install OpenAI SDK first: `npm install openai`
import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function generar(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}