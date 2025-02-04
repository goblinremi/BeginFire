import { KYCData } from "../context/KYCContext";

export async function submitKYCApplication(data: KYCData) {
    try {
        // Convert files to FormData if needed
        const formData = new FormData();

        // Add all non-file data
        const jsonData = {
            personalInfo: {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
            },
            identity: {
                ssn: data.ssn,
                dateOfBirth: data.dateOfBirth,
                citizenship: data.citizenship,
                taxResidency: data.taxResidency,
            },
            address: data.residentialAddress,
            employment: {
                status: data.employmentStatus,
                employer: data.employer,
                occupation: data.occupation,
                yearsEmployed: data.yearsEmployed,
                annualIncome: data.annualIncome,
                sourceOfIncome: data.sourceOfIncome,
            },
            investment: {
                experience: data.investmentExperience,
                riskTolerance: data.riskTolerance,
                objectives: data.investmentObjectives,
                liquidNetWorth: data.liquidNetWorth,
                totalNetWorth: data.totalNetWorth,
            },
            regulatory: {
                isPoliticallyExposed: data.isPoliticallyExposed,
                isAffiliatedWithBrokerDealer: data.isAffiliatedWithBrokerDealer,
                isShareholder: data.isShareholder,
            },
            agreements: {
                hasAcceptedTerms: data.hasAcceptedTerms,
                hasAcceptedPrivacyPolicy: data.hasAcceptedPrivacyPolicy,
                hasAcceptedCustomerAgreement: data.hasAcceptedCustomerAgreement,
                hasAcceptedMarginAgreement: data.hasAcceptedMarginAgreement,
            },
        };

        formData.append("data", JSON.stringify(jsonData));

        // Add files if they exist
        if (data.governmentIdFront) {
            formData.append("governmentIdFront", data.governmentIdFront);
        }
        if (data.governmentIdBack) {
            formData.append("governmentIdBack", data.governmentIdBack);
        }
        if (data.proofOfAddress) {
            formData.append("proofOfAddress", data.proofOfAddress);
        }

        const response = await fetch("/api/kyc/submit", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error submitting KYC application:", error);
        throw error;
    }
}
