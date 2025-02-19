"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useKYC } from "../context/KYCContext";
import { KYC_STEPS } from "../constants";
import { StepId } from "../types";

export function KYCStepGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { canAccessStep, isStepCompleted } = useKYC();

    useEffect(() => {
        const currentStep = KYC_STEPS.find((step) => step.path === pathname);

        if (!currentStep) {
            // If not on a KYC step, don't guard
            return;
        }

        if (!canAccessStep(currentStep.id)) {
            // Find the last completed step or the first incomplete required step
            const lastCompletedStep = [...KYC_STEPS]
                .reverse()
                .find((step) => isStepCompleted(step.id));

            const firstIncompleteRequired = KYC_STEPS.find(
                (step) => step.required && !isStepCompleted(step.id)
            );

            const redirectStep =
                lastCompletedStep || firstIncompleteRequired || KYC_STEPS[0];
            router.push(redirectStep.path);
        }
    }, [pathname, canAccessStep, isStepCompleted, router]);

    return <>{children}</>;
}
