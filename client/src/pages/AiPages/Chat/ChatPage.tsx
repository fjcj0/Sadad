import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import SendMessage from "../../../components/SendMessage";
import Message from "../../../ui/messages/Message";
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import SplashScreen from "../../../tools/SplashScreen";
import { baseUrl } from "../../../utils/baseUrl";
axios.defaults.withCredentials = true;
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
    useEffect(() => {
        handleMessages();
    }, []);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        setTimeout(scrollToBottom, 100);
    }, [messages]);
    const sendMessage = async () => {
        if (!message.trim()) return;
        setIsLoading(true);
        const timestamp = new Date().toLocaleString();
        const userMessage = message;
        try {
            setMessages(prev => [...prev, { role: 'user', message: userMessage, created_at: timestamp }]);
            const response = await axios.post(
                `${baseUrl}/api/message/send-message`,
                { question: message }
            );
            setMessage('');
            const aiAnswer: string = response.data.answer;
            setMessages(prev => [...prev, { role: 'ai', message: aiAnswer, created_at: new Date().toLocaleString() }]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    if (isFetchingMessages) return <SplashScreen />;
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
                    <Message key={index} message={msg.message} role={msg.role} time={msg.created_at} />
                ))}
                {isLoading && (
                    <div role="status" className="self-end">
                        <svg aria-hidden="true" className="w-8 h-8 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#3B82F6" />
                        </svg>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <SendMessage message={message} setMessage={setMessage} send={sendMessage} isLoading={isLoading} />
        </div>
    );
};
export default ChatPage;