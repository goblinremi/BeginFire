import { KYCData, StepConfig } from "./types";

export const KYC_STEPS: StepConfig[] = [
    {
        id: "identity",
        path: "/onboard/kyc/identity",
        title: "Identity Verification",
        description: "Verify your identity with basic information",
        required: true,
    },
    {
        id: "financial",
        path: "/onboard/kyc/financial",
        title: "Financial Information",
        description: "Tell us about your financial situation",
        required: true,
        dependencies: ["identity"],
    },
    {
        id: "employment",
        path: "/onboard/kyc/employment",
        title: "Employment Information",
        description: "Tell us about your employment",
        required: true,
        dependencies: ["financial"],
        showIf: (data: KYCData) =>
            data.financial.employmentStatus === "employed",
    },
    {
        id: "address",
        path: "/onboard/kyc/address",
        title: "Address Information",
        description: "Provide your residential address",
        required: true,
        dependencies: ["identity"],
    },
    // {
    //     id: "personal",
    //     path: "/onboard/kyc/personal",
    //     title: "Personal Information",
    //     description: "Additional personal details",
    //     required: true,
    //     dependencies: ["identity"],
    // },
    // {
    //     id: "investment",
    //     path: "/onboard/kyc/investment",
    //     title: "Investment Profile",
    //     description: "Investment experience and goals",
    //     required: true,
    //     dependencies: ["financial"],
    // },
    // {
    //     id: "regulatory",
    //     path: "/onboard/kyc/regulatory",
    //     title: "Regulatory Questions",
    //     description: "Required regulatory information",
    //     required: true,
    //     dependencies: ["identity"],
    // },
    // {
    //     id: "documents",
    //     path: "/onboard/kyc/documents",
    //     title: "Document Upload",
    //     description: "Required documentation",
    //     required: true,
    //     dependencies: ["identity", "address"],
    // },
    // {
    //     id: "agreements",
    //     path: "/onboard/kyc/agreements",
    //     title: "Agreements",
    //     description: "Review and accept agreements",
    //     required: true,
    //     dependencies: ["identity", "financial", "regulatory"],
    // },
];

// Financial Form Options
export const EMPLOYMENT_STATUS_OPTIONS = [
    { value: "employed", label: "Employed" },
    { value: "unemployed", label: "Unemployed" },
    { value: "retired", label: "Retired" },
    { value: "student", label: "Student" },
] as const;

export const HOUSEHOLD_INCOME_OPTIONS = [
    { value: "0-20000", label: "0 - $20,000" },
    { value: "20000-49999", label: "$20,000 - $49,999" },
    { value: "50000-99999", label: "$50,000 - $99,999" },
    { value: "100000-499999", label: "$100,000 - $499,999" },
    { value: "500000-999999", label: "$500,000 - $999,999" },
    { value: "1000000+", label: "$1,000,000+" },
] as const;

export const INVESTIBLE_ASSETS_OPTIONS = [
    { value: "0-20000", label: "0 - $20,000" },
    { value: "20000-49999", label: "$20,000 - $49,999" },
    { value: "50000-99999", label: "$50,000 - $99,999" },
    { value: "100000-499999", label: "$100,000 - $499,999" },
    { value: "500000-999999", label: "$500,000 - $999,999" },
    { value: "1000000+", label: "$1,000,000+" },
] as const;

export const INVESTMENT_EXPERIENCE_OPTIONS = [
    { value: "none", label: "None" },
    { value: "limited", label: "Limited" },
    { value: "good", label: "Good" },
    { value: "extensive", label: "Extensive" },
] as const;

export const ACCOUNT_FUNDING_SOURCE_OPTIONS = [
    { value: "employment_income", label: "Employment Income" },
    { value: "investments", label: "Investments" },
    { value: "inheritance", label: "Inheritance" },
    { value: "business_income", label: "Business Income" },
    { value: "savings", label: "Savings" },
    { value: "family", label: "Family" },
] as const;
