import 'dotenv/config';


import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function generar(prompt) {
    const response = await tvly.search(prompt);

    console.log(response);
    return response;
}