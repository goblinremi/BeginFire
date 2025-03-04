"use client";
import { Button } from "@/components/ui/button";
import { useKYC } from "../../context/KYCContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Upload, X } from "lucide-react";
import Camera from "../../components/Camera";
import { useState } from "react";
import {
    idVerificationFormSchema,
    type IdVerificationFormData,
} from "../../types";

const labelClassName = "text-sm font-medium mb-2";

interface DocumentData {
    content: string;
    mime_type: string;
}

const IdVerificationPage = () => {
    const { data, updateStepData, nextStep } = useKYC();
    const [showCamera, setShowCamera] = useState(false);
    const [previews, setPreviews] = useState<{
        [K in keyof IdVerificationFormData]?: string;
    }>({});
    const [isProcessing, setIsProcessing] = useState(false);

    const form = useForm<IdVerificationFormData>({
        resolver: zodResolver(idVerificationFormSchema),
        defaultValues: {
            governmentId: data.idVerification.governmentId,
            // governmentIdFront: data.idVerification.governmentIdFront,
            // governmentIdBack: data.idVerification.governmentIdBack,
        },
    });

    const onSubmit = (values: IdVerificationFormData) => {
        updateStepData("idVerification", values, true);
        nextStep();
    };

    const convertToBase64 = (file: File): Promise<DocumentData> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
                const base64Content = base64String.split(",")[1];
                resolve({
                    content: base64Content,
                    mime_type: file.type,
                });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleFileUpload = async (
        field: keyof IdVerificationFormData,
        file: File
    ) => {
        try {
            setIsProcessing(true);
            const preview = URL.createObjectURL(file);
            setPreviews((prev) => ({ ...prev, [field]: preview }));

            const documentData = await convertToBase64(file);
            debugger;
            form.setValue(field, documentData as any);
        } catch (error) {
            console.error("Error processing file:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCapture = (
        field: keyof IdVerificationFormData,
        imageData: string
    ) => {
        // For camera captures, the imageData is already a data URL
        try {
            setIsProcessing(true);
            setPreviews((prev) => ({ ...prev, [field]: imageData }));

            // Extract base64 content and mime type from data URL
            const matches = imageData.match(
                /^data:([A-Za-z-+/]+);base64,(.+)$/
            );

            if (matches && matches.length === 3) {
                const mimeType = matches[1];
                const base64Content = matches[2];
                debugger;
                form.setValue(field, {
                    content: base64Content,
                    mime_type: mimeType,
                } as any);
            }

            setShowCamera(false);
        } catch (error) {
            console.error("Error processing capture:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRemove = (field: keyof IdVerificationFormData) => {
        form.setValue(field, {
            content: "",
            mime_type: "",
        } as any);
        setPreviews((prev) => {
            const newPreviews = { ...prev };
            if (newPreviews[field]) {
                URL.revokeObjectURL(newPreviews[field]!);
                delete newPreviews[field];
            }
            return newPreviews;
        });
    };

    const renderUploadField = (
        field: keyof IdVerificationFormData,
        label: string
    ) => (
        <FormField
            control={form.control}
            name={field}
            render={({ field: formField }) => (
                <FormItem>
                    <FormLabel className={labelClassName}>{label}</FormLabel>
                    <FormControl>
                        <div className="mt-2 border-2 border-dashed border-[#D9D9D9] rounded-lg p-8 text-center hover:border-primary transition-colors">
                            {previews[field] ? (
                                <div className="relative">
                                    <img
                                        src={previews[field]}
                                        alt={label}
                                        className="max-h-48 mx-auto rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-red-50"
                                        onClick={() => handleRemove(field)}
                                    >
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-4">
                                    <Upload className="h-8 w-8 text-neutral" />
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id={field}
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file)
                                                    handleFileUpload(
                                                        field,
                                                        file
                                                    );
                                            }}
                                        />
                                        <label
                                            htmlFor={field}
                                            className="text-sm text-neutral cursor-pointer"
                                        >
                                            Upload a file or{" "}
                                        </label>
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="p-0 h-auto font-normal"
                                            onClick={() => setShowCamera(true)}
                                        >
                                            take a photo
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    return (
        <div className="flex flex-col justify-between w-full h-full">
            {showCamera && (
                <Camera
                    onCapture={(imageData) => {
                        handleCapture("governmentId", imageData);
                    }}
                    title="Photograph ID"
                    onClose={() => setShowCamera(false)}
                    caption="Photograph the front of your ID"
                />
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full flex flex-col justify-between"
                >
                    <div className="space-y-8">
                        {renderUploadField("governmentId", "Government ID")}
                        {/* {renderUploadField(
                            "governmentIdBack",
                            "Government ID (Back)"
                        )} */}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        variant="neon"
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : "Continue"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default IdVerificationPage;
