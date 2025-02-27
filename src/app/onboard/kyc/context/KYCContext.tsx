"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { submitKYCApplication } from "../services/kycService";
import { useToast } from "@/hooks/use-toast";
import {
    ACCOUNT_FUNDING_SOURCE_OPTIONS,
    INVESTMENT_EXPERIENCE_OPTIONS,
    INVESTIBLE_ASSETS_OPTIONS,
    HOUSEHOLD_INCOME_OPTIONS,
    EMPLOYMENT_STATUS_OPTIONS,
    KYC_STEPS,
} from "../constants";
import {
    type KYCData,
    type KYCFormState,
    type KYCContextType,
    type StepId,
} from "../types";

const KYCContext = createContext<KYCContextType | undefined>(undefined);

const initialKYCData: KYCData = {
    identity: {
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        ssn: "",
        dateOfBirth: new Date(),
        address: {
            street1: "",
            city: "",
            state: "",
            zipCode: "",
        },
        address2: "",
        formattedAddress: "",
        countryOfTaxResidence: false,
        countryOfCitizenship: false,
    },
    employment: {
        employer: "",
        jobTitle: "",
        address: {
            street1: "",
            city: "",
            state: "",
            zipCode: "",
        },
        formattedAddress: "",
        address2: "",
    },
    financial: {
        employmentStatus: EMPLOYMENT_STATUS_OPTIONS[0].value,
        householdIncome: HOUSEHOLD_INCOME_OPTIONS[0].value,
        investibleAssets: INVESTIBLE_ASSETS_OPTIONS[0].value,
        investmentExperience: INVESTMENT_EXPERIENCE_OPTIONS[0].value,
        // riskTolerance: "",
        // investmentObjectives: [],
        accountFundingSource: ACCOUNT_FUNDING_SOURCE_OPTIONS[0].value,
    },
    affiliations: {
        affiliatedWithBrokerDealer: false,
        isShareholderOrSeniorExecutive: false,
        isSeniorPoliticalFigure: false,
        isFamilyMemberOfSeniorPoliticalFigure: false,
        isNoneOfTheAbove: false,
    },
    broker: {
        customerAgreement: false,
        digitalSignature: false,
    },
    documents: {},
    idVerificationIntro: {},
    idVerification: {
        governmentIdFront: {} as File,
        governmentIdBack: {} as File,
    },
};

const initialFormState: KYCFormState = {
    identity: { isValid: false, isSubmitted: false, data: null },
    employment: { isValid: false, isSubmitted: false, data: null },
    financial: { isValid: false, isSubmitted: false, data: null },
    affiliations: { isValid: false, isSubmitted: false, data: null },
    idVerificationIntro: { isValid: false, isSubmitted: false, data: null },
    idVerification: { isValid: false, isSubmitted: false, data: null },
    broker: { isValid: false, isSubmitted: false, data: null },
    documents: { isValid: false, isSubmitted: false, data: null },
};

export function KYCProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { toast } = useToast();
    const [formState, setFormState] = useState<KYCFormState>(initialFormState);
    const [data, setData] = useState<KYCData>(initialKYCData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const updateStepData = <T extends keyof KYCData>(
        step: T,
        stepData: Partial<KYCData[T]>,
        isValid = false
    ) => {
        setFormState((prev) => ({
            ...prev,
            [step]: {
                isValid,
                isSubmitted: true,
                data: { ...prev[step].data, ...stepData },
            },
        }));

        setData((prev) => ({
            ...prev,
            [step]: { ...prev[step], ...stepData },
        }));
        debugger;
    };

    const nextStep = () => {
        if (currentStep < KYC_STEPS.length - 1) {
            let nextStepIndex = currentStep + 1;

            // Skip steps that shouldn't be shown based on conditions
            while (
                nextStepIndex < KYC_STEPS.length &&
                KYC_STEPS[nextStepIndex] &&
                KYC_STEPS[nextStepIndex].showIf &&
                !KYC_STEPS[nextStepIndex].showIf?.(data)
            ) {
                nextStepIndex++;
            }

            if (nextStepIndex < KYC_STEPS.length) {
                router.push(KYC_STEPS[nextStepIndex].path);
                setCurrentStep(nextStepIndex);
            }
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            router.push(KYC_STEPS[currentStep - 1].path);
            setCurrentStep(currentStep - 1);
        }
    };

    const submitApplication = async () => {
        try {
            setIsSubmitting(true);
            await submitKYCApplication(data);

            toast({
                title: "Application Submitted",
                description:
                    "Your KYC application has been submitted successfully.",
                duration: 5000,
            });

            router.push("/onboard/kyc/success");
        } catch (error) {
            console.error("Error submitting application:", error);
            toast({
                title: "Submission Failed",
                description:
                    "There was an error submitting your application. Please try again.",
                variant: "destructive",
                duration: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStepCompleted = (stepId: StepId): boolean => {
        return formState[stepId].isValid && formState[stepId].isSubmitted;
    };

    const canAccessStep = (stepId: StepId): boolean => {
        const step = KYC_STEPS.find((s) => s.id === stepId);
        if (!step) return false;

        // Check if step should be shown based on conditions
        if (step.showIf && !step.showIf(data)) {
            return false;
        }

        // Check if all dependencies are completed
        if (step.dependencies) {
            const dependenciesCompleted = step.dependencies.every((depId) =>
                isStepCompleted(depId)
            );
            if (!dependenciesCompleted) return false;
        }

        // If there are previous required steps that aren't completed, block access
        const stepIndex = KYC_STEPS.findIndex((s) => s.id === stepId);
        const previousSteps = KYC_STEPS.slice(0, stepIndex);
        const previousRequired = previousSteps.filter(
            (s) => s.required && (!s.showIf || s.showIf(data))
        );

        return previousRequired.every((s) => isStepCompleted(s.id));
    };

    return (
        <KYCContext.Provider
            value={{
                data,
                formState,
                currentStep,
                updateStepData,
                nextStep,
                previousStep,
                submitApplication,
                isSubmitting,
                isStepCompleted,
                canAccessStep,
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
