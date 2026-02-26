import axios from "axios";
export const AskAi = async (messages) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:11434/api/chat",
      {
        model: "qwen2.5:14b",
        messages,
        stream: false,
        format: "json",
        options: {
          temperature: 0.2,
          num_predict: 250,
          top_k: 30
        }
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 60000
      }
    );
    return response.data.message.content;
  } catch (error) {
    console.error("Ollama Error:", error.response?.data || error.message);
    throw new Error(error.message || "AI request failed");
  }
};