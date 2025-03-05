import { NextResponse } from "next/server";
import {
    identityFormSchema,
    employmentFormSchema,
    financialFormSchema,
    brokerFormSchema,
    affiliationsFormSchema,
    idVerificationFormSchema,
    type KYCSubmitResponse,
    agreementsFormSchema,
} from "@/app/onboard/kyc/types";

import { createClient } from "@/utils/supabase/server";

const stateNameToAbbreviation = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
    "District of Columbia": "DC",
};

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: user } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 401 }
            );
        }

        const existingProfile = await supabase
            .from("profile")
            .select("onboarding_status")
            .eq("id", user.user?.id)
            .single();

        if (existingProfile.data?.onboarding_status !== "IN_PROGRESS") {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not in onboarding",
                },
                { status: 401 }
            );
        }

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
        const agreementsValidation = agreementsFormSchema.safeParse(
            data.agreements
        );
        console.log("identityValidation", identityValidation);
        console.log("employmentValidation", employmentValidation);
        console.log("financialValidation", financialValidation);
        console.log("brokerValidation", brokerValidation);
        console.log("affiliationsValidation", affiliationsValidation);
        console.log("idVerificationValidation", idVerificationValidation);
        console.log("agreementsValidation", agreementsValidation);
        if (
            !identityValidation.success ||
            !employmentValidation.success ||
            !financialValidation.success ||
            !brokerValidation.success ||
            !affiliationsValidation.success ||
            !idVerificationValidation.success ||
            !agreementsValidation.success
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
                    agreements: agreementsValidation.success
                        ? null
                        : agreementsValidation.error.format(),
                }),
            };
            return NextResponse.json(response, { status: 400 });
        }
        console.log("Validation passed");
        // frontend error handling, bug where tries to submit two times on button click, normalize data to api request format

        const createAccountOptions = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                authorization: `Basic ${process.env.ALPACA_BASE_64}`,
            },
            body: JSON.stringify({
                contact: {
                    street_address: [data.identity.address.street1],
                    state: stateNameToAbbreviation[
                        data.identity.address
                            .state as keyof typeof stateNameToAbbreviation
                    ],
                    email_address: user.user?.email,
                    phone_number: data.identity.phone,
                    unit: data.identity.address2,
                    city: data.identity.address.city,
                    postal_code: data.identity.address.zipCode,
                },
                identity: {
                    tax_id_type: "USA_SSN",
                    given_name: data.identity.firstName,
                    family_name: data.identity.lastName,
                    middle_name: data.identity.middleName,
                    date_of_birth: data.identity.dateOfBirth.split("T")[0],
                    tax_id: data.identity.ssn.replace(
                        /(\d{3})(\d{2})(\d{4})/,
                        "$1-$2-$3"
                    ),
                    country_of_citizenship: data.identity.countryOfCitizenship
                        ? "USA"
                        : "", // not supported
                    country_of_tax_residence: data.identity
                        .countryOfTaxResidence
                        ? "USA"
                        : "", // not supported
                    funding_source: [data.financial.accountFundingSource],
                    liquid_net_worth_min:
                        data.financial.investibleAssets.split("-")[0],
                    liquid_net_worth_max:
                        data.financial.investibleAssets.split("-")[1],
                    annual_income_min:
                        data.financial.householdIncome.split("-")[0],
                    annual_income_max:
                        data.financial.householdIncome.split("-")[1],
                },
                disclosures: {
                    is_control_person: false,
                    is_affiliated_exchange_or_finra: false,
                    is_politically_exposed: false,
                    immediate_family_exposed: false,
                    employment_status: data.financial.employmentStatus,
                    employer_name: data.employment.employer,
                    employer_address: data.employment.address.street1,
                    employment_position: data.employment.jobTitle,
                },
                documents: [
                    {
                        document_type: "identity_verification",
                        content: data.idVerification.governmentId.content,
                        mime_type: data.idVerification.governmentId.mime_type,
                    },
                ],
                account_type: "trading",
                agreements: data.agreements,
            }),
        };
        console.log("createAccountOptions", createAccountOptions);
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
