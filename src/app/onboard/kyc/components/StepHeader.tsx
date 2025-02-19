"use client";
import { Button } from "@/components/ui/button";
import { useKYC } from "../context/KYCContext";
import { KYC_STEPS } from "../constants";
import { Icons } from "@/components/ui/icons";

export function StepHeader() {
    const { previousStep, currentStep } = useKYC();
    const currentStepConfig = KYC_STEPS[currentStep];

    return (
        <header className="border-b-1 border-offwhite p-4 flex items-center px-4 py-2 justify-between">
            {currentStep > 0 ? (
                <Icons.arrowLeft
                    onClick={previousStep}
                    className="w-4 h-4 text-neutral"
                />
            ) : (
                <div></div>
            )}

            <h4>{currentStepConfig?.title}</h4>
            <div>
                {currentStep + 1} of {KYC_STEPS.length}
            </div>
        </header>
    );
}
