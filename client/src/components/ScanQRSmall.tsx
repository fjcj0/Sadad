import React, { useRef, useEffect, useState } from "react";
import jsQR, { type QRCode } from "jsqr";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ScanQRSmall: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
    const navigate = useNavigate();
    useEffect(() => {
        let rafId: number;
        let stream: MediaStream | null = null;
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                }
                rafId = requestAnimationFrame(tick);
            } catch {
                setError("تعذر تشغيل الكاميرا");
            }
        };
        const stopCamera = () => {
            if (stream) stream.getTracks().forEach((t) => t.stop());
            cancelAnimationFrame(rafId);
        };
        const tick = () => {
            if (!videoRef.current || !canvasRef.current) {
                rafId = requestAnimationFrame(tick);
                return;
            }
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
                rafId = requestAnimationFrame(tick);
                return;
            }
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code: QRCode | null = jsQR(imageData.data, canvas.width, canvas.height);
            if (code) {
                setResult(code.data);
                stopCamera();
                navigate(code.data);
                return;
            }
            rafId = requestAnimationFrame(tick);
        };
        startCamera();
        return () => stopCamera();
    }, [facingMode, navigate]);
    return (
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden border flex items-center justify-center">
            <video ref={videoRef} className="absolute w-full h-full object-cover" />
            <canvas ref={canvasRef} className="absolute w-full h-full" />
            <button
                onClick={onClose}
                className="absolute w-8 h-8 flex items-center justify-center top-2 right-2 rounded-full bg-red-600 text-white"
            >
                <XIcon />
            </button>
            {result && (
                <p className="absolute bottom-14 bg-white text-black px-4 py-1 rounded text-sm">
                    {result}
                </p>
            )}
            {error && (
                <p className="absolute bottom-14 text-red-500 font-semibold">
                    {error}
                </p>
            )}
        </div>
    );
};
export default ScanQRSmall;