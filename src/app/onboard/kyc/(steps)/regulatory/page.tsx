"use client";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "../components/StepIndicator";
import { Label } from "@/components/ui/label";
import { useKYC } from "../context/KYCContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegulatoryPage = () => {
    const { data, updateData, nextStep, previousStep, isStepValid } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    return (
        <div className="space-y-8">
            <StepIndicator currentStep={5} />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-base">
                            Are you or any immediate family members a
                            politically exposed person (PEP)?
                        </Label>
                        <RadioGroup
                            value={data.isPoliticallyExposed ? "yes" : "no"}
                            onValueChange={(value) =>
                                updateData({
                                    isPoliticallyExposed: value === "yes",
                                })
                            }
                            className="flex flex-col space-y-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="pep-yes" />
                                <Label htmlFor="pep-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="pep-no" />
                                <Label htmlFor="pep-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base">
                            Are you affiliated with a broker-dealer?
                        </Label>
                        <RadioGroup
                            value={
                                data.isAffiliatedWithBrokerDealer ? "yes" : "no"
                            }
                            onValueChange={(value) =>
                                updateData({
                                    isAffiliatedWithBrokerDealer:
                                        value === "yes",
                                })
                            }
                            className="flex flex-col space-y-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="yes"
                                    id="broker-dealer-yes"
                                />
                                <Label htmlFor="broker-dealer-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="no"
                                    id="broker-dealer-no"
                                />
                                <Label htmlFor="broker-dealer-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base">
                            Are you a 10% or greater shareholder in any publicly
                            traded company?
                        </Label>
                        <RadioGroup
                            value={data.isShareholder ? "yes" : "no"}
                            onValueChange={(value) =>
                                updateData({
                                    isShareholder: value === "yes",
                                })
                            }
                            className="flex flex-col space-y-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="yes"
                                    id="shareholder-yes"
                                />
                                <Label htmlFor="shareholder-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="no"
                                    id="shareholder-no"
                                />
                                <Label htmlFor="shareholder-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={previousStep}
                    >
                        Back
                    </Button>
                    <Button type="submit" disabled={!isStepValid()}>
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegulatoryPage;
