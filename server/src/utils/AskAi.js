import axios from "axios";
export const AskAi = async (prompt) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/ask", { prompt });
    if (response.data.success) {
      return response.data.response;
    } else {
      throw new Error(response.data.error || "Unknown error from Python server");
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};