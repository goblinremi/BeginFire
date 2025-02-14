"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { submitKYCApplication } from "../services/kycService";
import { useToast } from "@/hooks/use-toast";

export interface KYCData {
    // Personal Info
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;

    // Identity Verification
    ssn: string;
    dateOfBirth: Date | undefined;
    citizenship: string;
    taxResidency: string;

    // Address Information
    residentialAddress: {
        street1: string;
        street2?: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };

    // Employment Information
    employmentStatus: string;
    employer?: string;
    occupation?: string;
    yearsEmployed?: number;
    annualIncome?: string;
    sourceOfIncome?: string[];

    // Investment Profile
    investmentExperience: string;
    riskTolerance: string;
    investmentObjectives: string[];
    liquidNetWorth: string;
    totalNetWorth: string;

    // Regulatory Questions
    isPoliticallyExposed: boolean;
    isAffiliatedWithBrokerDealer: boolean;
    isShareholder: boolean;

    // Documents
    governmentIdFront?: File;
    governmentIdBack?: File;
    proofOfAddress?: File;

    // Agreements
    hasAcceptedTerms: boolean;
    hasAcceptedPrivacyPolicy: boolean;
    hasAcceptedCustomerAgreement: boolean;
    hasAcceptedMarginAgreement?: boolean;
}

interface KYCContextType {
    data: KYCData;
    currentStep: number;
    updateData: (newData: Partial<KYCData>) => void;
    nextStep: () => void;
    previousStep: () => void;
    isStepValid: () => boolean;
    submitApplication: () => Promise<void>;
    isSubmitting: boolean;
}

const KYCContext = createContext<KYCContextType | undefined>(undefined);

// Define the steps
const ONBOARDING_STEPS = [
    {
        path: "/onboard/kyc/personal",
        title: "Personal Info",
        description: "Basic personal details",
        fields: ["firstName", "middleName", "lastName", "email", "phone"],
    },
    {
        path: "/onboard/kyc/identity",
        title: "Identity",
        description: "Identity verification",
        fields: ["ssn", "dateOfBirth", "citizenship", "taxResidency"],
    },
    {
        path: "/onboard/kyc/address",
        title: "Address",
        description: "Residential address",
        fields: ["residentialAddress"],
    },
    {
        path: "/onboard/kyc/employment",
        title: "Employment",
        description: "Employment information",
        fields: [
            "employmentStatus",
            "employer",
            "occupation",
            "yearsEmployed",
            "annualIncome",
            "sourceOfIncome",
        ],
    },
    {
        path: "/onboard/kyc/investment",
        title: "Investment Profile",
        description: "Investment experience and goals",
        fields: [
            "investmentExperience",
            "riskTolerance",
            "investmentObjectives",
            "liquidNetWorth",
            "totalNetWorth",
        ],
    },
    {
        path: "/onboard/kyc/regulatory",
        title: "Regulatory Questions",
        description: "Required regulatory information",
        fields: [
            "isPoliticallyExposed",
            "isAffiliatedWithBrokerDealer",
            "isShareholder",
        ],
    },
    {
        path: "/onboard/kyc/documents",
        title: "Document Upload",
        description: "Required documentation",
        fields: ["governmentIdFront", "governmentIdBack", "proofOfAddress"],
    },
    {
        path: "/onboard/kyc/agreements",
        title: "Agreements",
        description: "Review and accept agreements",
        fields: [
            "hasAcceptedTerms",
            "hasAcceptedPrivacyPolicy",
            "hasAcceptedCustomerAgreement",
            "hasAcceptedMarginAgreement",
        ],
    },
] as const;

export function KYCProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { toast } = useToast();
    const [data, setData] = useState<KYCData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        ssn: "",
        dateOfBirth: undefined,
        citizenship: "",
        taxResidency: "",
        residentialAddress: {
            street1: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
        employmentStatus: "",
        investmentExperience: "",
        riskTolerance: "",
        investmentObjectives: [],
        liquidNetWorth: "",
        totalNetWorth: "",
        isPoliticallyExposed: false,
        isAffiliatedWithBrokerDealer: false,
        isShareholder: false,
        hasAcceptedTerms: false,
        hasAcceptedPrivacyPolicy: false,
        hasAcceptedCustomerAgreement: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getCurrentStepIndex = () => {
        const currentPath = window.location.pathname;
        return ONBOARDING_STEPS.findIndex((step) => currentPath === step.path);
    };

    const isStepValid = () => {
        const currentStep = getCurrentStepIndex();

        switch (currentStep) {
            case 0: // Personal Info
                return (
                    data.firstName.trim() !== "" &&
                    data.lastName.trim() !== "" &&
                    data.email.trim() !== "" &&
                    data.phone.trim() !== "" &&
                    data.ssn.length === 9 &&
                    data.dateOfBirth !== undefined &&
                    data.citizenship.trim() !== "" &&
                    data.taxResidency.trim() !== ""
                );
            case 1: // Identity
                return (
                    data.ssn.length === 9 &&
                    data.dateOfBirth !== undefined &&
                    data.citizenship.trim() !== "" &&
                    data.taxResidency.trim() !== ""
                );
            case 2: // Address
                return (
                    data.residentialAddress.street1.trim() !== "" &&
                    data.residentialAddress.city.trim() !== "" &&
                    data.residentialAddress.state.trim() !== "" &&
                    data.residentialAddress.zipCode.trim() !== "" &&
                    data.residentialAddress.country.trim() !== ""
                );
            case 3: // Employment
                return (
                    data.employmentStatus.trim() !== "" &&
                    data.yearsEmployed !== undefined &&
                    data.annualIncome !== undefined &&
                    data.sourceOfIncome !== undefined
                );
            case 4: // Investment Profile
                return (
                    data.investmentExperience.trim() !== "" &&
                    data.riskTolerance.trim() !== "" &&
                    data.investmentObjectives.length > 0 &&
                    data.liquidNetWorth.trim() !== "" &&
                    data.totalNetWorth.trim() !== ""
                );
            case 5: // Regulatory Questions
                return (
                    data.isPoliticallyExposed === true &&
                    data.isAffiliatedWithBrokerDealer === true &&
                    data.isShareholder === true
                );
            case 6: // Documents
                return (
                    data.governmentIdFront !== undefined &&
                    data.governmentIdBack !== undefined &&
                    data.proofOfAddress !== undefined
                );
            case 7: // Agreements
                return (
                    data.hasAcceptedTerms === true &&
                    data.hasAcceptedPrivacyPolicy === true &&
                    data.hasAcceptedCustomerAgreement === true &&
                    data.hasAcceptedMarginAgreement === true
                );
            default:
                return false;
        }
    };

    const nextStep = () => {
        console.log("nextStep");
        if (!isStepValid()) return;

        const currentIndex = getCurrentStepIndex();
        if (currentIndex < ONBOARDING_STEPS.length - 1) {
            router.push(ONBOARDING_STEPS[currentIndex + 1].path);
        }
    };

    const previousStep = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex > 0) {
            router.push(ONBOARDING_STEPS[currentIndex - 1].path);
        }
    };

    const updateData = (newData: Partial<KYCData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const submitApplication = async () => {
        if (!isStepValid()) return;

        try {
            setIsSubmitting(true);
            await submitKYCApplication(data);

            toast({
                title: "Application Submitted",
                description:
                    "Your KYC application has been submitted successfully.",
                duration: 5000,
            });

            // Redirect to success page or dashboard
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

    return (
        <KYCContext.Provider
            value={{
                data,
                currentStep: getCurrentStepIndex(),
                updateData,
                nextStep,
                previousStep,
                isStepValid,
                submitApplication,
                isSubmitting,
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

// Export the steps for use in other components
export const getOnboardingSteps = () => ONBOARDING_STEPS;
