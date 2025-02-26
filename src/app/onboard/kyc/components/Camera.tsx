import { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CameraProps {
    onCapture: (imageData: string) => void;
    onClose: () => void;
}

const Camera = ({ onCapture, onClose }: CameraProps) => {
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            onCapture(imageSrc);
        }
    }, [onCapture]);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-2xl mx-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-white/80"
                >
                    <X className="h-6 w-6" />
                </Button>

                <div className="bg-black rounded-lg overflow-hidden">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: "user", //{ exact: "environment" },
                        }}
                        className="w-full"
                    />
                    <div className="p-4 flex justify-center">
                        <button
                            onClick={capture}
                            className="bg-white rounded-full p-4 shadow-lg"
                        >
                            <div className="w-4 h-4 rounded-full border-2 border-black" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Camera;
