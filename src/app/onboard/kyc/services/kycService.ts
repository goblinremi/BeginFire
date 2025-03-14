import { KYCData } from "../types";
import {
    identityFormSchema,
    employmentFormSchema,
    financialFormSchema,
    brokerFormSchema,
    affiliationsFormSchema,
    idVerificationFormSchema,
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
            financial: data.financial,
            broker: data.broker,
            idVerification: data.idVerification,
            affiliations: data.affiliations,
            agreements: [] as {
                agreement: string;
                signed_at: string;
                ip_address: string;
            }[],
        };
        debugger;

        // Validate all form sections
        const identityValidation = identityFormSchema.safeParse(data.identity);
        const employmentValidation = employmentFormSchema.safeParse(
            data.employment
        );
        const financialValidation = financialFormSchema.safeParse(
            data.financial
        );
        const affiliationsValidation = affiliationsFormSchema.safeParse(
            data.affiliations
        );
        const idVerificationValidation = idVerificationFormSchema.safeParse(
            data.idVerification
        );
        // broker is failing right now because it is the last step and the state is not updated
        const brokerValidation = brokerFormSchema.safeParse(data.broker);
        if (!identityValidation.success) {
            debugger;
            throw new Error("Identity validation failed");
        }

        if (!employmentValidation.success) {
            debugger;
            throw new Error("Employment validation failed");
        }

        if (!financialValidation.success) {
            debugger;
            throw new Error("Financial validation failed");
        }

        if (!affiliationsValidation.success) {
            debugger;
            throw new Error("Affiliations validation failed");
        }

        if (!idVerificationValidation.success) {
            debugger;
            throw new Error("ID verification validation failed");
        }

        if (!brokerValidation.success) {
            debugger;
            throw new Error("Broker validation failed");
        }

        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json();
        const signedAt = new Date().toISOString();
        jsonData.agreements = [
            {
                agreement: "margin_agreement",
                signed_at: signedAt,
                ip_address: ip,
            },
            {
                agreement: "account_agreement",
                signed_at: signedAt,
                ip_address: ip,
            },
            {
                agreement: "customer_agreement",
                signed_at: signedAt,
                ip_address: ip,
            },
        ];
        formData.append("data", JSON.stringify(jsonData));
        debugger;

        // const testData = {
        //     identity: {
        //         firstName: "Jenny",
        //         lastName: "Peng",
        //         middleName: "",
        //         phone: "+15302048623",
        //         ssn: "605804273",
        //         dateOfBirth: "1994-03-04T19:35:57.772Z",
        //         address: {
        //             street1: "4026 Alegre Way",
        //             city: "Davis",
        //             state: "California",
        //             zipCode: "95618",
        //         },
        //         address2: "2",
        //         formattedAddress: "4026 Alegre Way, Davis, CA 95618, USA",
        //         countryOfTaxResidence: true,
        //         countryOfCitizenship: true,
        //     },
        //     employment: {
        //         employer: "Augminted",
        //         jobTitle: "Dev",
        //         address: {
        //             street1: "4026 Alegre Way",
        //             city: "Davis",
        //             state: "California",
        //             zipCode: "95618",
        //         },
        //         formattedAddress: "4026 Alegre Way, Davis, CA 95618, USA",
        //         address2: "1",
        //     },
        //     financial: {
        //         employmentStatus: "employed",
        //         householdIncome: "0-20000",
        //         investibleAssets: "0-20000",
        //         investmentExperience: "none",
        //         accountFundingSource: "employment_income",
        //     },
        //     broker: {
        //         customerAgreement: true,
        //         digitalSignature: true,
        //     },
        //     idVerification: {
        //         governmentIdFront: {},
        //         governmentIdBack: {},
        //     },
        //     affiliations: {
        //         affiliatedWithBrokerDealer: false,
        //         isShareholderOrSeniorExecutive: false,
        //         isSeniorPoliticalFigure: false,
        //         isFamilyMemberOfSeniorPoliticalFigure: false,
        //         isNoneOfTheAbove: true,
        //     },
        // };
        // const formData = new FormData();
        // formData.append("data", JSON.stringify(testData));
        // debugger;
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
