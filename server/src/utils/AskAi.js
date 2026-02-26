import axios from "axios";
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: process.env.API_KEY, 
});
export const AskAi = async (messages) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages,
      });
      return completion.choices[0]?.message?.content || "";
    }
    const response = await axios.post(
      "http://127.0.0.1:11434/api/chat",
      {
        model: "qwen2.5:14b",
        messages,
        stream: false,
        options: {
          temperature: 0.2,
          num_predict: 250,
          top_k: 30,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 60000,
      }
    );
    return response.data.message.content;
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    throw new Error(error.message || "AI request failed");
  }
};