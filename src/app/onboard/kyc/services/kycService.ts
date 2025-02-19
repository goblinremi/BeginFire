import { KYCData } from "../types";
import {
    identityFormSchema,
    employmentFormSchema,
    financialFormSchema,
    type KYCSubmitResponse,
} from "../types";

export async function submitKYCApplication(
    data: KYCData
): Promise<KYCSubmitResponse> {
    try {
        const formData = new FormData();
        const jsonData = {
            identity: data.identity,
            employment: data.employment,
            address: data.address,
            financial: data.financial,
            regulatory: data.regulatory,
            agreements: data.agreements,
        };

        // Validate all form sections
        const identityValidation = identityFormSchema.safeParse(data.identity);
        const employmentValidation = employmentFormSchema.safeParse(
            data.employment
        );
        const financialValidation = financialFormSchema.safeParse(
            data.financial
        );

        if (!identityValidation.success) {
            throw new Error("Identity validation failed");
        }

        if (!employmentValidation.success) {
            throw new Error("Employment validation failed");
        }

        if (!financialValidation.success) {
            throw new Error("Financial validation failed");
        }

        formData.append("data", JSON.stringify(jsonData));

        // Add files if they exist
        if (data.documents.governmentIdFront) {
            formData.append(
                "governmentIdFront",
                data.documents.governmentIdFront
            );
        }
        if (data.documents.governmentIdBack) {
            formData.append(
                "governmentIdBack",
                data.documents.governmentIdBack
            );
        }
        if (data.documents.proofOfAddress) {
            formData.append("proofOfAddress", data.documents.proofOfAddress);
        }

        const response = await fetch("/api/kyc/submit", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error submitting KYC application:", error);
        throw error;
    }
}
