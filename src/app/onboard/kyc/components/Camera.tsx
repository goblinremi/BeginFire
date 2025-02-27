import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Icons } from "@/components/ui/icons";

interface CameraProps {
    onCapture: (imageData: string) => void;
    onClose: () => void;
    caption?: string;
    title?: string;
}

const Camera = ({ onCapture, onClose, caption, title }: CameraProps) => {
    const webcamRef = useRef<Webcam>(null);
    const [isFront, setIsFront] = useState(true);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            onCapture(imageSrc);
        }
    }, [onCapture]);

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="mt-8 w-full fixed top-0 left-0 flex">
                {title && (
                    <h4 className="w-full text-white text-center">{title}</h4>
                )}
            </div>
            <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:text-white/80"
            >
                <X className="h-10 w-10" />
            </Button>
            <div className="mt-4 relative w-full max-w-2xl mx-4">
                <div className="overflow-hidden relative">
                    <div className="absolute w-8 h-8 border-t-4 border-l-4 border-primary-neon rounded-tl-4xl top-0 left-0" />
                    <div className="absolute w-8 h-8 border-t-4 border-r-4 border-primary-neon rounded-tr-4xl top-0 right-0" />
                    <div className="absolute w-8 h-8 border-b-4 border-l-4 border-primary-neon rounded-bl-4xl bottom-0 left-0" />
                    <div className="absolute w-8 h-8 border-b-4 border-r-4 border-primary-neon rounded-br-4xl bottom-0 right-0" />
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: isFront ? "environment" : "user",
                            aspectRatio: 1,
                        }}
                        className="w-full aspect-square p-2 rounded-4xl"
                    />
                </div>
                {caption && (
                    <h1 className="text-white text-center mt-8">{caption}</h1>
                )}
                <p className="text-neutral-300 text-sm font-medium text-center mt-2">
                    Place your ID on a flat surface and center properly. Make
                    sure that your environment has good lighting so that the
                    text is clearly visible.
                </p>
                <div className="p-4 flex justify-center">
                    <Button
                        variant="neon"
                        onClick={capture}
                        className="rounded-full p-4 shadow-lg fixed bottom-12"
                    >
                        <div className="w-4 h-4 rounded-full border-2 border-black" />
                    </Button>
                    <Button
                        variant="neon"
                        onClick={() => setIsFront(!isFront)}
                        className="rounded-full p-4  right-12 shadow-lg fixed bottom-12"
                    >
                        <Icons.rotateCamera className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Camera;
