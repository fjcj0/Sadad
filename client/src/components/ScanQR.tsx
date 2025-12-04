import React, { useRef, useEffect, useState } from "react";
import jsQR, { type QRCode } from "jsqr";
import { XIcon } from "lucide-react";
const ScanQR: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
    const [scanning, setScanning] = useState<boolean>(false);
    useEffect(() => {
        let rafId: number;
        let stream: MediaStream | null = null;
        const startCamera = async () => {
            try {
                if (!videoRef.current) return;
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode },
                });
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setScanning(true);
                rafId = requestAnimationFrame(tick);
            } catch {
                setError("فشل في تشغيل الكاميرا");
            }
        };
        const stopCamera = () => {
            if (stream) stream.getTracks().forEach((track) => track.stop());
            if (rafId) cancelAnimationFrame(rafId);
            setScanning(false);
        };
        const openLink = (url: string) => {
            try {
                const opened = window.open(url, "_system");
                if (!opened) {
                    window.location.href = url;
                }
            } catch {
                window.location.href = url;
            }
        };
        const tick = () => {
            if (
                !videoRef.current ||
                !canvasRef.current ||
                videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA
            ) {
                rafId = requestAnimationFrame(tick);
                return;
            }
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const size = Math.min(window.innerWidth, window.innerHeight);
            canvas.width = size;
            canvas.height = size;
            const sx = (video.videoWidth - size) / 2;
            const sy = (video.videoHeight - size) / 2;
            ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
            const imageData = ctx.getImageData(0, 0, size, size);
            const code: QRCode | null = jsQR(imageData.data, size, size);
            if (code) {
                setResult(code.data);
                stopCamera();
                if (code.data.startsWith("http://") || code.data.startsWith("https://")) {
                    openLink(code.data);
                    return;
                }
            }
            rafId = requestAnimationFrame(tick);
        };
        startCamera();
        return () => stopCamera();
    }, [facingMode]);
    const toggleCamera = () =>
        setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
    return (
        <div className="fixed inset-0 bg-black text-white flex flex-col z-200 items-center justify-center">
            <button
                onClick={onClose}
                className="absolute cursor-pointer top-4 right-4 w-10 h-10 flex items-center justify-center bg-white text-black rounded-full text-xl font-bold z-50"
            >
                <XIcon />
            </button>
            <h1 className="text-2xl font-bold mb-6">QR Scanner</h1>
            <div className="relative w-full h-full max-w-[500px] max-h-[500px] rounded-2xl overflow-hidden border-4 border-white">
                <video ref={videoRef} className="hidden" />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
                {scanning && (
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-green-400 animate-scan"></div>
                )}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-400" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-400" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-400" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-400" />
            </div>
            <div className="mt-6">
                <button
                    onClick={toggleCamera}
                    className="px-6 py-2 cursor-pointer bg-white text-black rounded-full font-bold hover:bg-gray-200 transition"
                >
                    تبديل الكاميرا
                </button>
            </div>
            {result && (
                <p className="mt-6 bg-white text-black px-4 py-2 rounded-md max-w-xs break-all text-center">
                    {result}
                </p>
            )}
            {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
            <style>{`
                @keyframes scan {
                    0% { top: 0; }
                    50% { top: 100%; }
                    100% { top: 0; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </div>
    );
};
export default ScanQR;