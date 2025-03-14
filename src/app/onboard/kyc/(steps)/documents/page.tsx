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
import { documentFormSchema, type DocumentFormData } from "../../types";

const labelClassName = "text-sm font-medium mb-2";

interface FileWithPreview extends File {
    preview?: string;
}

const DocumentsPage = () => {
    const { data, updateStepData, nextStep } = useKYC();
    const [showCamera, setShowCamera] = useState<{
        governmentIdFront?: boolean;
        governmentIdBack?: boolean;
        proofOfAddress?: boolean;
    }>({});
    const [previews, setPreviews] = useState<{
        [K in keyof DocumentFormData]?: string;
    }>({});

    const form = useForm<DocumentFormData>({
        resolver: zodResolver(documentFormSchema),
        defaultValues: {
            governmentIdFront: data.documents.governmentIdFront,
            governmentIdBack: data.documents.governmentIdBack,
            proofOfAddress: data.documents.proofOfAddress,
        },
    });

    const onSubmit = (values: DocumentFormData) => {
        updateStepData("documents", values, true);
        nextStep();
    };

    const handleFileUpload = async (
        field: keyof DocumentFormData,
        file: File
    ) => {
        const preview = URL.createObjectURL(file);
        setPreviews((prev) => ({ ...prev, [field]: preview }));
        form.setValue(field, file);
    };

    const handleCapture = (
        field: keyof DocumentFormData,
        imageData: string
    ) => {
        fetch(imageData)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], `${field}.jpg`, {
                    type: "image/jpeg",
                });
                handleFileUpload(field, file);
                setShowCamera({});
            });
    };

    const handleRemove = (field: keyof DocumentFormData) => {
        form.setValue(field, undefined);
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
        field: keyof DocumentFormData,
        label: string
    ) => (
        <FormField
            control={form.control}
            name={field}
            render={({ field: formField }) => (
                <FormItem>
                    <FormLabel className={labelClassName}>{label}</FormLabel>
                    <FormControl>
                        <div className="border-2 border-dashed border-[#D9D9D9] rounded-lg p-8 text-center hover:border-primary transition-colors">
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
                                            onClick={() =>
                                                setShowCamera({
                                                    [field]: true,
                                                })
                                            }
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
            {(showCamera.governmentIdFront ||
                showCamera.governmentIdBack ||
                showCamera.proofOfAddress) && (
                <Camera
                    onCapture={(imageData) => {
                        const field = Object.entries(showCamera).find(
                            ([_, value]) => value
                        )?.[0] as keyof DocumentFormData;
                        if (field) {
                            handleCapture(field, imageData);
                        }
                    }}
                    onClose={() => setShowCamera({})}
                />
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {renderUploadField(
                        "governmentIdFront",
                        "Government ID (Front)"
                    )}
                    {renderUploadField(
                        "governmentIdBack",
                        "Government ID (Back)"
                    )}
                    {renderUploadField("proofOfAddress", "Proof of Address")}

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        variant="neon"
                    >
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default DocumentsPage;
