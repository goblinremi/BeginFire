"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useKYC } from "../context/KYCContext";
import { StepIndicator } from "../components/StepIndicator";

const employmentStatusOptions = [
    "Employed",
    "Self-Employed",
    "Retired",
    "Student",
    "Unemployed",
];

const sourceOfIncomeOptions = [
    "Employment Income",
    "Investments",
    "Inheritance",
    "Business Income",
    "Pension",
    "Other",
];

const EmploymentPage = () => {
    const { data, updateData, nextStep, isStepValid } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <StepIndicator currentStep={2} />

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label>Employment Status</Label>
                        <Select
                            value={data.employmentStatus}
                            onValueChange={(value: string) =>
                                updateData({ employmentStatus: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {employmentStatusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {data.employmentStatus === "Employed" && (
                        <>
                            <div>
                                <Label>Employer</Label>
                                <Input
                                    value={data.employer}
                                    onChange={(e) =>
                                        updateData({ employer: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Occupation</Label>
                                <Input
                                    value={data.occupation}
                                    onChange={(e) =>
                                        updateData({
                                            occupation: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Years Employed</Label>
                                <Input
                                    type="number"
                                    value={data.yearsEmployed}
                                    onChange={(e) =>
                                        updateData({
                                            yearsEmployed: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <Label>Annual Income</Label>
                        <Select
                            value={data.annualIncome}
                            onValueChange={(value: string) =>
                                updateData({ annualIncome: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    "Under $25,000",
                                    "$25,000 - $50,000",
                                    "$50,000 - $100,000",
                                    "$100,000 - $250,000",
                                    "Over $250,000",
                                ].map((income) => (
                                    <SelectItem key={income} value={income}>
                                        {income}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Source of Income (Select all that apply)</Label>
                        <div className="space-y-2">
                            {sourceOfIncomeOptions.map((source) => (
                                <label
                                    key={source}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.sourceOfIncome?.includes(
                                            source
                                        )}
                                        onChange={(e) => {
                                            const currentSources =
                                                data.sourceOfIncome || [];
                                            const newSources = e.target.checked
                                                ? [...currentSources, source]
                                                : currentSources.filter(
                                                      (s) => s !== source
                                                  );
                                            updateData({
                                                sourceOfIncome: newSources,
                                            });
                                        }}
                                    />
                                    <span>{source}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button type="submit" disabled={!isStepValid()}>
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EmploymentPage;
