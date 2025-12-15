import 'dotenv/config';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
export const TextToSpeech = async (text) => {
    const stream = await client.textToSpeech.convert(process.env.VOICE_ID, {
        text,
        modelId: 'eleven_multilingual_v2',
        outputFormat: 'mp3_44100_128',
    });
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};
