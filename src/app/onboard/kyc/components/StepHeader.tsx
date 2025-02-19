"use client";
import { Button } from "@/components/ui/button";
import { useKYC } from "../context/KYCContext";
import { ONBOARDING_STEPS } from "../constants";
import { Icons } from "@/components/ui/icons";
export function StepHeader() {
    const { previousStep, currentStep } = useKYC();

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

            <h4>{ONBOARDING_STEPS[currentStep]?.title}</h4>
            <div>{currentStep}</div>
        </header>
    );
}
