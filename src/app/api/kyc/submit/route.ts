import { NextResponse } from "next/server";
import {
    identityFormSchema,
    employmentFormSchema,
    financialFormSchema,
    brokerFormSchema,
    type KYCSubmitResponse,
} from "@/app/onboard/kyc/types";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const data = JSON.parse(formData.get("data") as string);

        // Validate all sections
        const identityValidation = identityFormSchema.safeParse(data.identity);
        const employmentValidation = employmentFormSchema.safeParse(
            data.employment
        );
        const financialValidation = financialFormSchema.safeParse(
            data.financial
        );
        const brokerValidation = brokerFormSchema.safeParse(data.broker);
        if (
            !identityValidation.success ||
            !employmentValidation.success ||
            !financialValidation.success ||
            !brokerValidation.success
        ) {
            const response: KYCSubmitResponse = {
                success: false,
                message: "Validation failed",
                error: JSON.stringify({
                    identity: identityValidation.success
                        ? null
                        : identityValidation.error.format(),
                    employment: employmentValidation.success
                        ? null
                        : employmentValidation.error.format(),
                    financial: financialValidation.success
                        ? null
                        : financialValidation.error.format(),
                }),
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Process files if they exist
        const governmentIdFront = formData.get("governmentIdFront") as File;
        const governmentIdBack = formData.get("governmentIdBack") as File;
        const proofOfAddress = formData.get("proofOfAddress") as File;

        // Here you would:
        // 1. Upload files to storage
        // 2. Store data in your database
        // 3. Make API calls to your KYC provider
        // 4. Create the user account if needed

        const response: KYCSubmitResponse = {
            success: true,
            message: "KYC application submitted successfully",
        };

        return NextResponse.json(response);
    } catch (error) {
        const response: KYCSubmitResponse = {
            success: false,
            message: "Failed to process KYC application",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        return NextResponse.json(response, { status: 500 });
    }
}
