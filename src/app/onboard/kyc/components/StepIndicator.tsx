import { getOnboardingSteps } from "../context/KYCContext";

interface StepIndicatorProps {
    currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    const steps = getOnboardingSteps();

    return (
        <div className="mb-8">
            <div className="flex justify-between">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center w-1/3"
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                            ${
                                index < currentStep
                                    ? "bg-primary text-white"
                                    : index === currentStep
                                    ? "bg-primary-100 text-primary border-2 border-primary"
                                    : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            {index < currentStep ? "✓" : index + 1}
                        </div>
                        <div className="text-center">
                            <div
                                className={`font-medium ${
                                    index <= currentStep
                                        ? "text-primary"
                                        : "text-gray-400"
                                }`}
                            >
                                {step.title}
                            </div>
                            <div
                                className={`text-sm ${
                                    index <= currentStep
                                        ? "text-secondary-500"
                                        : "text-gray-400"
                                }`}
                            >
                                {step.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative mt-4">
                <div className="absolute top-0 h-1 bg-gray-200 w-full" />
                <div
                    className="absolute top-0 h-1 bg-primary transition-all duration-300"
                    style={{
                        width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
}
