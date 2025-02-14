"use client";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "../components/StepIndicator";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useKYC } from "../context/KYCContext";

const DocumentsPage = () => {
    const { previousStep, nextStep, isStepValid } = useKYC();

    // const handleFileUpload = (
    //     type: "governmentIdFront" | "governmentIdBack" | "proofOfAddress",
    //     file: File
    // ) => {
    //     updateData({ [type]: file });
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    return (
        <div className="space-y-8">
            <StepIndicator currentStep={6} />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Government ID (Front)</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary transition-colors">
                                <div className="flex flex-col items-center space-y-4">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Drag and drop your file here, or{" "}
                                            <span className="text-primary">
                                                browse
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Supported formats: JPG, PNG, PDF
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Government ID (Back)</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary transition-colors">
                                <div className="flex flex-col items-center space-y-4">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Drag and drop your file here, or{" "}
                                            <span className="text-primary">
                                                browse
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Supported formats: JPG, PNG, PDF
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Proof of Address</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary transition-colors">
                                <div className="flex flex-col items-center space-y-4">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Drag and drop your file here, or{" "}
                                            <span className="text-primary">
                                                browse
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Utility bill, bank statement, etc.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={previousStep}
                    >
                        Back
                    </Button>
                    <Button type="submit" disabled={!isStepValid()}>
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DocumentsPage;
