// import the ChatGPTAPI
import 'dotenv/config';
import { ChatGPTAPI } from 'chatgpt'

export async function generar(prompt) {
  // Initialize the constructor with your OpenAI API key
  const api = new ChatGPTAPI({
    apiKey: process.env.API_KEY_GPT
  })
  // Invoke the sendMessage method to send a message to the GPT-3 model
  const res = await api.sendMessage(prompt);
  return res.text;
  // display the response
  console.log(res.text);
}
