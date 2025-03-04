import { z } from "zod";
import {
    EMPLOYMENT_STATUS_OPTIONS,
    HOUSEHOLD_INCOME_OPTIONS,
    INVESTIBLE_ASSETS_OPTIONS,
    INVESTMENT_EXPERIENCE_OPTIONS,
    ACCOUNT_FUNDING_SOURCE_OPTIONS,
} from "./constants";

// Form Schemas
export const identityFormSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" })
        .regex(/^[a-zA-Z\s\-']+$/, {
            message:
                "First name can only contain letters, spaces, hyphens and apostrophes",
        }),
    middleName: z.string().optional(),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .regex(
            /^[a-zA-Z\s\-']+$/,
            "Last name can only contain letters, spaces, hyphens and apostrophes"
        ),
    dateOfBirth: z
        .date({
            required_error: "Date of birth is required",
        })
        .refine((date) => {
            const today = new Date();
            const birthDate = new Date(date);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            return age >= 18;
        }, "You must be at least 18 years old"),
    phone: z.string().min(10, "Phone number is required"),
    ssn: z
        .string()
        .min(9, "SSN must be 9 digits")
        .max(9, "SSN must be 9 digits")
        .regex(/^[0-9]+$/, "SSN must contain only numbers"),
    address: z.object({
        street1: z.string().min(1, "Street address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zipCode: z.string().min(1, "Zip code is required"),
    }),
    formattedAddress: z.string().min(1, "Formatted address is required"),
    address2: z.string().optional(),
    countryOfTaxResidence: z.boolean().refine((val) => val === true, {
        message: "You must be a US tax resident",
    }),
    countryOfCitizenship: z.boolean().refine((val) => val === true, {
        message: "You must be a US citizen",
    }),
});

export const employmentFormSchema = z.object({
    employer: z.string().optional(),
    jobTitle: z.string().optional(),
    address: z.object({
        street1: z.string().min(1, "Street address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zipCode: z.string().min(1, "Zip code is required"),
    }),
    formattedAddress: z.string().min(1, "Formatted address is required"),
    address2: z.string().optional(),
});

// Define the literal types from our constants
export type EmploymentStatus =
    (typeof EMPLOYMENT_STATUS_OPTIONS)[number]["value"];
export type HouseholdIncome =
    (typeof HOUSEHOLD_INCOME_OPTIONS)[number]["value"];
export type InvestibleAssets =
    (typeof INVESTIBLE_ASSETS_OPTIONS)[number]["value"];
export type InvestmentExperience =
    (typeof INVESTMENT_EXPERIENCE_OPTIONS)[number]["value"];
export type AccountFundingSource =
    (typeof ACCOUNT_FUNDING_SOURCE_OPTIONS)[number]["value"];

export const financialFormSchema = z.object({
    employmentStatus: z.enum(
        EMPLOYMENT_STATUS_OPTIONS.map((opt) => opt.value) as [
            string,
            ...string[]
        ],
        {
            required_error: "Employment status is required",
            invalid_type_error: "Please select a valid employment status",
        }
    ),
    householdIncome: z.enum(
        HOUSEHOLD_INCOME_OPTIONS.map((opt) => opt.value) as [
            string,
            ...string[]
        ],
        {
            required_error: "Household income is required",
            invalid_type_error: "Please select a valid income range",
        }
    ),
    investibleAssets: z.enum(
        INVESTIBLE_ASSETS_OPTIONS.map((opt) => opt.value) as [
            string,
            ...string[]
        ],
        {
            required_error: "Investible assets is required",
            invalid_type_error: "Please select a valid asset range",
        }
    ),
    investmentExperience: z.enum(
        INVESTMENT_EXPERIENCE_OPTIONS.map((opt) => opt.value) as [
            string,
            ...string[]
        ],
        {
            required_error: "Investment experience is required",
            invalid_type_error: "Please select a valid experience level",
        }
    ),
    accountFundingSource: z.enum(
        ACCOUNT_FUNDING_SOURCE_OPTIONS.map((opt) => opt.value) as [
            string,
            ...string[]
        ],
        {
            required_error: "Account funding source is required",
            invalid_type_error: "Please select a valid funding source",
        }
    ),
    // investmentObjectives: z
    //     .array(z.string())
    //     .min(1, "At least one investment objective is required"),
});

export const affiliationsFormSchema = z.object({
    affiliatedWithBrokerDealer: z.boolean().refine((val) => val === false, {
        message: "You must not be affiliated with a broker dealer",
    }),
    isShareholderOrSeniorExecutive: z.boolean().refine((val) => val === false, {
        message: "You must not be a shareholder or senior executive",
    }),
    isSeniorPoliticalFigure: z.boolean().refine((val) => val === false, {
        message: "You must not be a senior political figure",
    }),
    isFamilyMemberOfSeniorPoliticalFigure: z
        .boolean()
        .refine((val) => val === false, {
            message:
                "You must not be a family member of a senior political figure",
        }),
    isNoneOfTheAbove: z.boolean().refine((val) => val === true, {
        message: "You must not be any of the above",
    }),
});

export const brokerFormSchema = z.object({
    customerAgreement: z.boolean().refine((val) => val === true, {
        message: "You must accept the customer agreement",
    }),
    digitalSignature: z.boolean().refine((val) => val === true, {
        message: "You must provide a digital signature",
    }),
});

export const idVerificationIntroFormSchema = z.object({});

export const idVerificationFormSchema = z.object({
    governmentId: z.object({
        content: z.string(),
        mime_type: z.string(),
    }),
    // governmentIdFront: z.instanceof(File),
    // governmentIdBack: z.instanceof(File),
});

// export const citizenshipFormSchema = z.object({
//     countryOfTaxResidence: z.boolean().refine((val) => val === true, {
//         message: "You must be a US tax resident",
//     }),
//     countryOfCitizenship: z.boolean().refine((val) => val === true, {
//         message: "You must be a US citizen",
//     }),
// });

export type IdentityFormData = z.infer<typeof identityFormSchema>;
export type EmploymentFormData = z.infer<typeof employmentFormSchema>;
export type FinancialFormData = z.infer<typeof financialFormSchema>;
export type AffiliationsFormData = z.infer<typeof affiliationsFormSchema>;
export type BrokerFormData = z.infer<typeof brokerFormSchema>;
export type IdVerificationIntroFormData = z.infer<
    typeof idVerificationIntroFormSchema
>;
export type IdVerificationFormData = z.infer<typeof idVerificationFormSchema>;
// export type CitizenshipFormData = z.infer<typeof citizenshipFormSchema>;

// Combined KYC Data Type
export interface KYCData {
    identity: IdentityFormData;
    employment: EmploymentFormData;
    financial: FinancialFormData;
    idVerificationIntro: IdVerificationIntroFormData;
    idVerification: IdVerificationFormData;
    affiliations: AffiliationsFormData;
    broker: BrokerFormData;
}

// Form State Types
export interface FormStepStatus {
    isValid: boolean;
    isSubmitted: boolean;
    data: any;
}

export type KYCFormState = {
    [K in keyof KYCData]: FormStepStatus;
};

// Service Types
export type ValidationResponse = {
    success: boolean;
    errors?: z.ZodError;
};

export type KYCSubmitResponse = {
    success: boolean;
    message: string;
    error?: string;
};

// Context Type
export interface KYCContextType {
    data: KYCData;
    formState: KYCFormState;
    currentStep: number;
    updateStepData: <T extends keyof KYCData>(
        step: T,
        data: Partial<KYCData[T]>,
        isValid?: boolean
    ) => void;
    nextStep: () => void;
    previousStep: () => void;
    submitApplication: () => Promise<void>;
    isSubmitting: boolean;
    isStepCompleted: (stepId: StepId) => boolean;
    canAccessStep: (stepId: StepId) => boolean;
}

export type StepId = keyof KYCData;

export interface StepConfig {
    id: StepId;
    path: string;
    title: string;
    description: string;
    required: boolean;
    dependencies?: StepId[];
    showIf?: (data: KYCData) => boolean;
}
