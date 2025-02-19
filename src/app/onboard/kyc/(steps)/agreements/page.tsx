"use client";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "../components/StepIndicator";
import { Label } from "@/components/ui/label";
import { useKYC } from "../context/KYCContext";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const AgreementsPage = () => {
    const {
        data,
        updateData,
        previousStep,
        isStepValid,
        submitApplication,
        isSubmitting,
    } = useKYC();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            await submitApplication();
        }
    };

    return (
        <div className="space-y-8">
            <StepIndicator currentStep={7} />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold">
                            Terms and Conditions
                        </Label>
                        <ScrollArea className="h-40 w-full rounded-md border p-4">
                            <div className="text-sm text-gray-600">
                                {/* Add your terms and conditions text here */}
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit...
                            </div>
                        </ScrollArea>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={data.hasAcceptedTerms}
                                onCheckedChange={(checked) =>
                                    updateData({
                                        hasAcceptedTerms: checked as boolean,
                                    })
                                }
                            />
                            <Label htmlFor="terms">
                                I have read and agree to the Terms and
                                Conditions
                            </Label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg font-semibold">
                            Privacy Policy
                        </Label>
                        <ScrollArea className="h-40 w-full rounded-md border p-4">
                            <div className="text-sm text-gray-600">
                                {/* Add your privacy policy text here */}
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit...
                            </div>
                        </ScrollArea>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="privacy"
                                checked={data.hasAcceptedPrivacyPolicy}
                                onCheckedChange={(checked) =>
                                    updateData({
                                        hasAcceptedPrivacyPolicy:
                                            checked as boolean,
                                    })
                                }
                            />
                            <Label htmlFor="privacy">
                                I have read and agree to the Privacy Policy
                            </Label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg font-semibold">
                            Customer Agreement
                        </Label>
                        <ScrollArea className="h-40 w-full rounded-md border p-4">
                            <div className="text-sm text-gray-600">
                                {/* Add your customer agreement text here */}
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit...
                            </div>
                        </ScrollArea>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="customer-agreement"
                                checked={data.hasAcceptedCustomerAgreement}
                                onCheckedChange={(checked) =>
                                    updateData({
                                        hasAcceptedCustomerAgreement:
                                            checked as boolean,
                                    })
                                }
                            />
                            <Label htmlFor="customer-agreement">
                                I have read and agree to the Customer Agreement
                            </Label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg font-semibold">
                            Margin Agreement
                        </Label>
                        <ScrollArea className="h-40 w-full rounded-md border p-4">
                            <div className="text-sm text-gray-600">
                                {/* Add your margin agreement text here */}
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit...
                            </div>
                        </ScrollArea>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="margin-agreement"
                                checked={data.hasAcceptedMarginAgreement}
                                onCheckedChange={(checked) =>
                                    updateData({
                                        hasAcceptedMarginAgreement:
                                            checked as boolean,
                                    })
                                }
                            />
                            <Label htmlFor="margin-agreement">
                                I have read and agree to the Margin Agreement
                            </Label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={previousStep}
                        disabled={isSubmitting}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        disabled={!isStepValid() || isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AgreementsPage;
