import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});


export async function generar(prompt) {
    const response = await client.responses.create({
        model: "openai/gpt-oss-20b",
        input: prompt,
    });
    console.log(response.output_text);
    return response.output_text;
}