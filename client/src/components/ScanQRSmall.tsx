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
        const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent);
        const startCamera = async () => {
            try {
                if (!videoRef.current) return;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: { ideal: facingMode } },
                    });
                } catch {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                }
                if (!videoRef.current) return;
                videoRef.current.srcObject = stream;
                videoRef.current.playsInline = true;
                await videoRef.current.play();

                rafId = requestAnimationFrame(tick);
            } catch (err) {
                console.error(err);
                setError("تعذر تشغيل الكاميرا. تأكد من السماح بالوصول أو استخدام HTTPS");
            }
        };
        const stopCamera = () => {
            if (stream) stream.getTracks().forEach((t) => t.stop());
            if (rafId) cancelAnimationFrame(rafId);
        };
        const tick = () => {
            if (!videoRef.current || !canvasRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
                rafId = requestAnimationFrame(tick);
                return;
            }
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
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
    const toggleCamera = () =>
        setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
    return (
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden border flex items-center justify-center bg-black">
            <video ref={videoRef} className="absolute w-0 h-0 opacity-0" playsInline />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
            <button
                onClick={onClose}
                className="absolute w-8 h-8 flex items-center justify-center top-2 right-2 rounded-full bg-red-600 text-white z-10"
            >
                <XIcon />
            </button>
            <button
                onClick={toggleCamera}
                className="absolute bottom-2 left-2 px-4 py-1 bg-white text-black rounded-full text-sm z-10"
            >
                تبديل الكاميرا
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