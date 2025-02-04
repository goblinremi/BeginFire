"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerForm } from "../components/DatePickerForm";
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

const steps = [
    {
        title: "Personal Info",
        description: "Basic details",
    },
    {
        title: "Identity",
        description: "Verify identity",
    },
    {
        title: "Documents",
        description: "Upload documents",
    },
];

const IdentityPage = () => {
    const { data, updateData, nextStep, isStepValid } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    return (
        <div className="space-y-8">
            <StepIndicator currentStep={0} steps={steps} />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={data.firstName}
                                onChange={(e) =>
                                    updateData({ firstName: e.target.value })
                                }
                                placeholder="First Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="middleName">
                                Middle Name (Optional)
                            </Label>
                            <Input
                                id="middleName"
                                value={data.middleName}
                                onChange={(e) =>
                                    updateData({ middleName: e.target.value })
                                }
                                placeholder="Middle Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={data.lastName}
                                onChange={(e) =>
                                    updateData({ lastName: e.target.value })
                                }
                                placeholder="Last Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    updateData({ email: e.target.value })
                                }
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
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
                            <DatePickerForm
                                value={data.dateOfBirth}
                                onChange={(date) =>
                                    updateData({ dateOfBirth: date })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                        onClick={nextStep}
                        type="submit"
                        disabled={!isStepValid()}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default IdentityPage;
