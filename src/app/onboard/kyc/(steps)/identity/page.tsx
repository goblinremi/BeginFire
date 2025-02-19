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
import { StepIndicator } from "../../components/StepIndicator";
import { Label } from "@/components/ui/label";
import { useKYC } from "../../context/KYCContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePickerForm } from "../../components/DatePickerForm";
import { PhoneInput } from "@/components/ui/phone-input";

const labelClassName = "text-sm font-medium mb-2";

const IdentityPage = () => {
    const { data, updateData, nextStep, previousStep, isStepValid } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submitted");
        // if (isStepValid()) {
        //     console.log("valid");
        //     nextStep();
        // }
        nextStep();
    };

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <div className="flex flex-col gap-y-8">
                <div onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex gap-x-2">
                        <div>
                            <Label
                                className={labelClassName}
                                htmlFor="firstName"
                            >
                                First Name
                            </Label>
                            <Input type="text" placeholder="First Name" />
                        </div>
                        <div>
                            <Label
                                className={labelClassName}
                                htmlFor="lastName"
                            >
                                Middle Name{" "}
                                <span className="text-xs text-neutral">
                                    (optional)
                                </span>
                            </Label>
                            <Input type="text" placeholder="Middle Name" />
                        </div>
                    </div>
                    <div>
                        <Label className={labelClassName} htmlFor="lastName">
                            Last Name
                        </Label>
                        <Input type="text" placeholder="Last Name" />
                    </div>
                    <div>
                        <Label className={labelClassName} htmlFor="lastName">
                            Date of Birth
                        </Label>
                        <DatePickerForm />
                    </div>
                </div>
                {/* todo: phone input is form component */}
                <div>
                    <Label
                        className={labelClassName}
                        htmlFor="lastName"
                        defaultValue="US"
                    >
                        Phone Number
                    </Label>
                    <PhoneInput />
                </div>
                <div>
                    <Label className={labelClassName} htmlFor="ssn">
                        <div className="flex flex-col">
                            SSN{" "}
                            <p className="mb-2 text-xs text-neutral">
                                SSN is used to help secure your account and
                                we're legally obliged to ask before opening your
                                account. Your info is secured with military
                                grade encryption.
                            </p>
                        </div>
                    </Label>
                    <Input
                        type="password"
                        placeholder="SSN"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={9}
                    />
                </div>
            </div>
            <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full"
                size="lg"
                variant="neon"
            >
                Continue
            </Button>
        </div>
    );
};

export default IdentityPage;
