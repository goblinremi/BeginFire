"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface KYCData {
    // Personal Info
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    // Identity
    ssn: string;
    dateOfBirth: Date | undefined;
    // Documents
    governmentIdFront?: File;
    governmentIdBack?: File;
    proofOfAddress?: File;
}

interface KYCContextType {
    data: KYCData;
    currentStep: number;
    updateData: (newData: Partial<KYCData>) => void;
    nextStep: () => void;
    previousStep: () => void;
    isStepValid: () => boolean;
}

const KYCContext = createContext<KYCContextType | undefined>(undefined);

const STEPS = ["/onboard/kyc/identity", "/onboard/kyc/documents"];

export function KYCProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [data, setData] = useState<KYCData>({
        firstName: "",
        lastName: "",
        email: "",
        ssn: "",
        dateOfBirth: undefined,
    });

    const getCurrentStepIndex = () => {
        const currentPath = window.location.pathname;
        return STEPS.indexOf(currentPath);
    };

    const isStepValid = () => {
        const currentStep = getCurrentStepIndex();

        switch (currentStep) {
            case 0: // Identity
                return (
                    data.firstName.trim() !== "" &&
                    data.lastName.trim() !== "" &&
                    data.email.trim() !== "" &&
                    data.ssn.length === 9 &&
                    data.dateOfBirth !== undefined
                );
            case 1: // Documents
                return (
                    data.governmentIdFront !== undefined &&
                    data.governmentIdBack !== undefined &&
                    data.proofOfAddress !== undefined
                );
            default:
                return false;
        }
    };

    const nextStep = () => {
        console.log("nextStep");
        if (!isStepValid()) return;

        const currentIndex = getCurrentStepIndex();
        if (currentIndex < STEPS.length - 1) {
            router.push(STEPS[currentIndex + 1]);
        }
    };

    const previousStep = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex > 0) {
            router.push(STEPS[currentIndex - 1]);
        }
    };

    const updateData = (newData: Partial<KYCData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    return (
        <KYCContext.Provider
            value={{
                data,
                currentStep: getCurrentStepIndex(),
                updateData,
                nextStep,
                previousStep,
                isStepValid,
            }}
        >
            {children}
        </KYCContext.Provider>
    );
}

export const useKYC = () => {
    const context = useContext(KYCContext);
    if (context === undefined) {
        throw new Error("useKYC must be used within a KYCProvider");
    }
    return context;
};
