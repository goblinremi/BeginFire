export const ONBOARDING_STEPS = [
    {
        path: "/onboard/kyc/identity",
        title: "Personal Info",
        description: "Basic personal details",
        fields: ["firstName", "middleName", "lastName", "email", "phone"],
    },
    {
        path: "/onboard/kyc/address",
        title: "Address",
        description: "Identity verification",
        fields: ["ssn", "dateOfBirth", "citizenship", "taxResidency"],
    },
    {
        path: "/onboard/kyc/personal",
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
];
