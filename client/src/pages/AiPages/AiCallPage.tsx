import { useRef, useState } from "react";
import LinkAi from "../../ui/links/LinkAi";
import Animation from "../../utils/Animation";
import blueAnimationRecord from '../../animation/BlueAudio.json';
import { StopCircle } from "lucide-react";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { playTTS } from "../../utils/TextToSpeech";
import { motion } from "framer-motion";
axios.defaults.withCredentials = true;
const AiCallPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunks.current = [];
            recorder.ondataavailable = (event: BlobEvent) => {
                audioChunks.current.push(event.data);
            };
            recorder.onstop = sendAudioToServer;
            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };
    const stopRecording = () => {
        if (!mediaRecorderRef.current) return;
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        mediaRecorderRef.current = null;
    };
    const sendAudioToServer = async () => {
        if (audioChunks.current.length === 0) return;
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        try {
            setIsLoading(true);
            const res = await fetch(`${baseUrl}/transbict-text`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await res.json();
            const recognizedText = data.text || "";
            setMessage(recognizedText);
            const response = await axios.post(`${baseUrl}/api/message/send-message`, {
                question: recognizedText,
                type: "voice"
            });
            setMessage(response.data.message);
            try {
                await playTTS(response.data.message);
            } catch (e) {
                console.log("TTS failed:", e instanceof Error ? e.message : e);
            }
            if (response.data.link) {
                navigate(response.data.link);
            }
        } catch (error) {
            console.error("Error sending audio:", error);
            setMessage("حدث خطأ أثناء معالجة الصوت.");
        } finally {
            setIsLoading(false);
        }
    };
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, duration: 0.5 } }
    };
    return (
        <motion.div
            className="w-full min-h-[85vh] flex flex-col items-center justify-center gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 className="mt-3" variants={itemVariants}>
                سدد فاتورتك بسهولة من خلال التحدث الى
            </motion.h1>
            <motion.h1 className="text-blue-primary font-bold" variants={itemVariants}>
                مساعد اي-سداد الذكي.
            </motion.h1>
            <motion.img
                src={'/pictures/listen.png'}
                alt="ai picture"
                className="w-50 rounded-full"
                variants={itemVariants}
            />
            <motion.div className="w-full flex gap-5 flex-col items-center text-center justify-center" variants={itemVariants}>
                <div className="text-[#7D7E83] text-xs leading-5 min-h-[2rem]">
                    {isLoading ? (
                        <span className="text-sm text-gray-500">جاري معالجة الصوت...</span>
                    ) : (
                        <span>{message || "يمكنك التحدث الآن لتسجيل سؤالك"}</span>
                    )}
                </div>
                <div className="w-full max-w-md flex items-center justify-center gap-5 p-3">
                    {isRecording ? (
                        <>
                            <button
                                onClick={stopRecording}
                                type="button"
                                className="cursor-pointer active:opacity-50 active:scale-75 duration-300 ease transition-all w-12 h-12 flex items-center justify-center bg-red-400 rounded-full"
                            >
                                <StopCircle color="white" />
                            </button>
                            <div className="mb-14">
                                <Animation animation={blueAnimationRecord} width={100} height={100} />
                            </div>
                            <LinkAi image="/icons/x.png" direction="/dashboard/ai" />
                        </>
                    ) : (
                        <>
                            <LinkAi image="/icons/message.png" direction="/chat" />
                            <button
                                onClick={startRecording}
                                type="button"
                                disabled={isLoading}
                                className="cursor-pointer active:scale-75 duration-300 ease transition-all flex items-center justify-center"
                            >
                                <img src="/icons/microphone-call.png" alt="icon microphone" />
                            </button>
                            <LinkAi image="/icons/x.png" direction="/dashboard/ai" />
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};
export default AiCallPage;