"use client";
import { Button } from "@/components/ui/button";
// import { DatePickerForm } from "../components/DatePickerForm";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { StepIndicator } from "../components/StepIndicator";
import { Label } from "@/components/ui/label";
import { useKYC } from "../context/KYCContext";
import { Select, SelectItem } from "@/components/ui/select";

const IdentityPage = () => {
    const { data, updateData, nextStep, previousStep, isStepValid } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    return (
        <div className="space-y-8">
            <StepIndicator currentStep={1} />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Social Security Number</Label>
                            <InputOTP
                                maxLength={9}
                                value={data.ssn}
                                onChange={(value) => updateData({ ssn: value })}
                                pattern={REGEXP_ONLY_DIGITS}
                                className="gap-2"
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={5} />
                                    <InputOTPSlot index={6} />
                                    <InputOTPSlot index={7} />
                                    <InputOTPSlot index={8} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            {/* <DatePickerForm
                                value={data.dateOfBirth}
                                onChange={(date: Date) =>
                                    updateData({ dateOfBirth: date })
                                }
                            /> */}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="citizenship">Citizenship</Label>
                            <Select
                                value={data.citizenship}
                                onValueChange={(value: string) =>
                                    updateData({ citizenship: value })
                                }
                            >
                                <SelectItem value="United States">
                                    United States
                                </SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="taxResidency">Tax Residency</Label>
                            <Select
                                value={data.taxResidency}
                                onValueChange={(value: string) =>
                                    updateData({ taxResidency: value })
                                }
                            >
                                <SelectItem value="United States">
                                    United States
                                </SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </Select>
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

export default IdentityPage;
