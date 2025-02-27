"use client";
import { Button } from "@/components/ui/button";
import { useKYC } from "../context/KYCContext";
import { KYC_STEPS } from "../constants";
import { Icons } from "@/components/ui/icons";

export function StepHeader() {
    const { previousStep, currentStep } = useKYC();
    const currentStepConfig = KYC_STEPS[currentStep];

    return (
        <header className="fixed h-20 top-0 left-0 right-0 border-b-1 border-offwhite bg-white p-4 flex items-center px-4 py-2 justify-between">
            {true ? (
                <Icons.chevronLeft
                    onClick={previousStep}
                    className="w-4 h-4 text-neutral"
                />
            ) : (
                <div></div>
            )}

            <div className="flex flex-col items-center gap-x-2">
                <h4>{currentStepConfig?.title}</h4>
                <p className="text-xs text-neutral-500">
                    {currentStep + 1} of {KYC_STEPS.length}
                </p>
            </div>
            <div></div>
        </header>
    );
}
