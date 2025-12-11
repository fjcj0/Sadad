import { useRef, useState, useEffect } from 'react';
import RecordAnimation from '../animation/BlueAudio.json';
import Animation from '../utils/Animation';
import { baseUrl } from '../utils/baseUrl';
type SendMessageProps = {
    message: string;
    setMessage: (value: string) => void;
    send: () => void;
    isLoading: boolean;
    setIsScan: (value: boolean) => void;
};
const SendMessage = ({ message, setMessage, send, isLoading, setIsScan }: SendMessageProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const adjustHeight = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };
    useEffect(() => {
        adjustHeight();
    }, [message]);
    const startRecording = async () => {
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
    };
    const stopRecording = () => {
        if (!mediaRecorderRef.current) return;
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    };
    const sendAudioToServer = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        const res = await fetch(`${baseUrl}/transbict-text`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const data = await res.json();
        setMessage(data.text);
    };
    return (
        <div className="fixed bottom-0 w-screen">
            <div className="w-full flex items-center p-5 justify-center gap-4 rounded-t-3xl bg-white/50 backdrop-filter backdrop-blur-sm border-t-[0.3px] border-t-gray-400 h-auto">
                <div>
                    {!isRecording ? (
                        <button
                            disabled={isLoading}
                            type="button"
                            onClick={startRecording}
                            className={`cursor-pointer w-10 h-10 rounded-full bg-blue-primary hover:bg-blue-700 duration-300 transition-all flex items-center justify-center ${isLoading && 'opacity-50'}`}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={stopRecording}
                            className="cursor-pointer w-13 h-13 duration-300 transition-all ease active:opacity-50 active:scale-75 rounded-full flex items-center justify-center"
                        >
                            <img src="/icons/stop.png" alt="" className="w-10 h-10" />
                        </button>
                    )}
                </div>
                <div className="w-full relative" dir="rtl">
                    {isRecording ? (
                        <Animation animation={RecordAnimation} width={5} height={5} />
                    ) : (
                        <div className="relative">
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    adjustHeight();
                                }}
                                rows={1}
                                className="w-full max-h-96 rounded-4xl bg-[#F8F8F8] px-14 py-5 text-sm placeholder:text-sm placeholder:text-[#AAAFB5] text-gray-700 resize-none"
                                placeholder="تحدث مع إي-سداد AI"
                            />
                            <button
                                disabled={isLoading}
                                type="button"
                                onClick={send}
                                className={`cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 ${isLoading && 'opacity-50'}`}
                            >
                                <img src="/icons/sendIcon.png" alt="send icon" className='w-5 h-5 mb-1' />
                            </button>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setIsScan(true)}
                    disabled={isLoading || isRecording}
                    type="button"
                    className={`cursor-pointer w-10 h-10 rounded-full items-center justify-center ${(isLoading || isRecording) && 'opacity-50'}`}
                >
                    <img src="/icons/camera.png" alt="camera" className="w-6" />
                </button>
            </div>
        </div>
    );
};
export default SendMessage;