import { baseUrl } from "./baseUrl";
export const playTTS = async (text: string) => {
    const res = await fetch(`${baseUrl}/text-to-speech`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    await audio.play();
};