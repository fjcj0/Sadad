import axios from "axios";
export const AskAi = async (prompt) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/ask", {
      prompt: prompt
    }, {
      headers: { "Content-Type": "application/json" },
      timeout: 60000 
    });
    if (response.data.success) {
      return response.data.response; 
    } else {
      console.error("AI Error:", response.data.error);
      throw new Error(response.data.error || "Unknown error from AI");
    }
  } catch (error) {
    console.error("Request to FastAPI failed:", error.message || error);
    throw new Error(error.message || String(error));
  }
};