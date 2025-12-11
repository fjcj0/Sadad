import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import SendMessage from "../../../components/SendMessage";
import Message from "../../../ui/messages/Message";
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import SplashScreen from "../../../tools/SplashScreen";
import { baseUrl } from "../../../utils/baseUrl";
import ScanQR from "../../../components/ScanQR";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

axios.defaults.withCredentials = true;
dayjs.extend(relativeTime);

type ChatMessage = {
    role: 'user' | 'ai';
    message: string;
    created_at: string;
};

const ChatPage = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isScanQr, setIsScanQr] = useState(false);

    const handleMessages = async () => {
        setIsFetchingMessages(true);
        try {
            const response = await axios.get(`${baseUrl}/api/message/get-messages`);
            if (response.status === 200) setMessages(response.data.messages);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setIsFetchingMessages(false);
        }
    };

    useEffect(() => { handleMessages(); }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { setTimeout(scrollToBottom, 100); }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setIsLoading(true);
        const timestamp = new Date().toISOString();
        const userMessage = message;

        try {
            setMessages(prev => [...prev, { role: 'user', message: userMessage, created_at: timestamp }]);
            setMessage('');

            let response;
            let retries = 0;

            while (retries < 3) {
                try {
                    response = await axios.post(`${baseUrl}/api/message/send-message`, { question: userMessage });
                    break;
                } catch (err: any) {
                    if (err.response?.data?.error?.includes("model is overloaded")) {
                        retries++;
                        await new Promise(res => setTimeout(res, 1000));
                    } else {
                        throw err;
                    }
                }
            }

            if (!response) throw new Error("فشل إرسال الرسالة بعد 3 محاولات");

            const aiMessage: string = response.data.message;
            const link: string | null = response.data.link || null;

            setMessages(prev => [
                ...prev,
                { role: 'ai', message: aiMessage, created_at: new Date().toISOString() }
            ]);

            // تحويل المستخدم مباشرة إذا كان هناك رابط
            if (link) navigate(link);

        } catch (error) {
            setMessages(prev => [
                ...prev,
                { role: 'ai', message: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.", created_at: new Date().toISOString() }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetchingMessages) return <SplashScreen />;
    if (isScanQr) return <ScanQR onClose={() => setIsScanQr(false)} />;

    return (
        <div className="w-screen min-h-[100vh] flex flex-col items-start justify-start">
            <div className="fixed w-screen bg-white/50 backdrop-filter backdrop-blur-sm flex items-center h-[5rem] justify-end" dir="rtl">
                <div className="w-[60%] px-3 max-md:w-[100%] flex items-start justify-between">
                    <h1 className="text-2xl font-medium">دردش مع E-SADAD</h1>
                    <button onClick={() => navigate(-1)} className="cursor-pointer">
                        <ArrowLeft />
                    </button>
                </div>
            </div>
            <div className="w-full h-[100vh] flex flex-col gap-5 overflow-auto px-5 pb-36 pt-24">
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        message={msg.message}
                        role={msg.role}
                        time={dayjs(msg.created_at).fromNow()}
                    />
                ))}
                {isLoading && (
                    <div role="status" className="self-end">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 animate-spin"
                            viewBox="0 0 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle className="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" fill="none" />
                            <circle className="opacity-75" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4" fill="none" />
                        </svg>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <SendMessage
                message={message}
                setMessage={setMessage}
                send={sendMessage}
                isLoading={isLoading}
                setIsScan={setIsScanQr}
            />
        </div>
    );
};

export default ChatPage;
