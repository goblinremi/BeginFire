"use client";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "../components/StepIndicator";
import { Label } from "@/components/ui/label";
import { useKYC } from "../context/KYCContext";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const experienceLevels = ["None", "Limited", "Good", "Extensive"];

const riskTolerances = ["Conservative", "Moderate", "Aggressive"];

const investmentObjectives = [
    "Capital Preservation",
    "Income",
    "Growth",
    "Speculation",
];

const netWorthRanges = [
    "Under $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000 - $1,000,000",
    "Over $1,000,000",
];

const InvestmentPage = () => {
    const { data, updateData, nextStep, previousStep, isStepValid } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    const toggleObjective = (objective: string) => {
        const currentObjectives = data.investmentObjectives || [];
        const newObjectives = currentObjectives.includes(objective)
            ? currentObjectives.filter((obj) => obj !== objective)
            : [...currentObjectives, objective];
        updateData({ investmentObjectives: newObjectives });
    };

    return (
        <div className="space-y-8">
            <StepIndicator currentStep={4} />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Investment Experience</Label>
                            <Select
                                value={data.investmentExperience}
                                onChange={(value) =>
                                    updateData({ investmentExperience: value })
                                }
                                options={experienceLevels}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Risk Tolerance</Label>
                            <Select
                                value={data.riskTolerance}
                                onChange={(value) =>
                                    updateData({ riskTolerance: value })
                                }
                                options={riskTolerances}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Investment Objectives (Select all that apply)
                            </Label>
                            <div className="grid grid-cols-2 gap-4">
                                {investmentObjectives.map((objective) => (
                                    <label
                                        key={objective}
                                        className="flex items-center space-x-2"
                                    >
                                        <Checkbox
                                            checked={data.investmentObjectives?.includes(
                                                objective
                                            )}
                                            onCheckedChange={() =>
                                                toggleObjective(objective)
                                            }
                                        />
                                        <span>{objective}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Liquid Net Worth</Label>
                            <Select
                                value={data.liquidNetWorth}
                                onChange={(value) =>
                                    updateData({ liquidNetWorth: value })
                                }
                                options={netWorthRanges}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Total Net Worth</Label>
                            <Select
                                value={data.totalNetWorth}
                                onChange={(value) =>
                                    updateData({ totalNetWorth: value })
                                }
                                options={netWorthRanges}
                            />
                        </div>
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

export default InvestmentPage;
