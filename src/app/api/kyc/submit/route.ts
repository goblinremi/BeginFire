import { NextResponse } from "next/server";
import {
    identityFormSchema,
    employmentFormSchema,
    financialFormSchema,
    brokerFormSchema,
    affiliationsFormSchema,
    idVerificationFormSchema,
    type KYCSubmitResponse,
} from "@/app/onboard/kyc/types";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const data = JSON.parse(formData.get("data") as string);
        console.log("data from backend route", data);

        // Validate all sections
        const identityValidation = identityFormSchema.safeParse({
            ...data.identity,
            dateOfBirth: new Date(data.identity.dateOfBirth),
        });
        const employmentValidation = employmentFormSchema.safeParse(
            data.employment
        );
        const financialValidation = financialFormSchema.safeParse(
            data.financial
        );
        const brokerValidation = brokerFormSchema.safeParse(data.broker);
        const affiliationsValidation = affiliationsFormSchema.safeParse(
            data.affiliations
        );
        const idVerificationValidation = idVerificationFormSchema.safeParse(
            data.idVerification
        );
        console.log("identityValidation", identityValidation);
        console.log("employmentValidation", employmentValidation);
        console.log("financialValidation", financialValidation);
        console.log("brokerValidation", brokerValidation);
        console.log("affiliationsValidation", affiliationsValidation);
        console.log("idVerificationValidation", idVerificationValidation);
        if (
            !identityValidation.success ||
            !employmentValidation.success ||
            !financialValidation.success ||
            !brokerValidation.success ||
            !affiliationsValidation.success ||
            !idVerificationValidation.success
        ) {
            console.log("Validation failed");
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
                    broker: brokerValidation.success
                        ? null
                        : brokerValidation.error.format(),
                    affiliations: affiliationsValidation.success
                        ? null
                        : affiliationsValidation.error.format(),
                    idVerification: idVerificationValidation.success
                        ? null
                        : idVerificationValidation.error.format(),
                }),
            };
            return NextResponse.json(response, { status: 400 });
        }
        console.log("Validation passed");
        // TODO: check auth token and supabase user, add alpaca key and secret in route, add email from supabase auth, state abbreviations, ip address, signed at
        // frontend error handling, bug where tries to submit two times on button click, normalize data to api request format

        const createAccountOptions = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                authorization:
                    "Basic Q0tBTTUwVVlVT0E0SkZWR0FXUTI6MkMwNTdlZkFla2w4ZERvaG93RFJWNjNNWnVtbHdqY1VqckRCTXdpVA==",
            },
            body: JSON.stringify({
                contact: {
                    street_address: [data.identity.address.street1],
                    state: "CA",
                    email_address: "john.doe@example.com",
                    phone_number: "+15556667788",
                    unit: "2",
                    city: "San Mateo",
                    postal_code: "94401",
                },
                identity: {
                    tax_id_type: "USA_SSN",
                    given_name: "John",
                    family_name: "Doe",
                    middle_name: "X",
                    date_of_birth: "1990-01-01",
                    tax_id: "605-55-4321",
                    country_of_citizenship: "USA",
                    country_of_birth: "USA",
                    country_of_tax_residence: "USA",
                    funding_source: ["employment_income"],
                },
                disclosures: {
                    is_control_person: false,
                    is_affiliated_exchange_or_finra: false,
                    is_politically_exposed: false,
                    immediate_family_exposed: false,
                    employment_status: "employed",
                    employer_name: "Augminted",
                    employer_address: "4026 Alegre Way",
                    employment_position: "Developer",
                },
                documents: [
                    {
                        document_type: "identity_verification",
                        content: "/9j/Cg==",
                        mime_type: "image/jpeg",
                    },
                ],
                account_type: "trading",
                agreements: [
                    {
                        agreement: "margin_agreement",
                        signed_at: "2019-09-11T18:09:33Z",
                        ip_address: "185.13.21.99",
                    },
                    {
                        agreement: "account_agreement",
                        signed_at: "2019-09-11T18:09:33Z",
                        ip_address: "185.13.21.99",
                    },
                    {
                        agreement: "customer_agreement",
                        signed_at: "2019-09-11T18:09:33Z",
                        ip_address: "185.13.21.99",
                    },
                ],
            }),
        };
        const response = await fetch(
            "https://broker-api.sandbox.alpaca.markets/v1/accounts",
            createAccountOptions
        );
        const accountResponse = await response.json();
        console.log("accountResponse", accountResponse);

        // const response: KYCSubmitResponse = {
        //     success: true,
        //     message: "KYC application submitted successfully",
        // };

        return NextResponse.json(accountResponse);
    } catch (error) {
        const response: KYCSubmitResponse = {
            success: false,
            message: "Failed to process KYC application",
            error: error instanceof Error ? error.message : "Unknown error",
        };
        return NextResponse.json(response, { status: 500 });
    }
}
