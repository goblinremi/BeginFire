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

const EmploymentPage = () => {
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
                    <div>
                        <Label
                            className={labelClassName}
                            htmlFor="employerName"
                        >
                            Employer Name
                        </Label>
                        <Input type="text" placeholder="Employer Name" />
                    </div>
                    <div>
                        <Label className={labelClassName} htmlFor="jobTitle">
                            Job Title
                        </Label>
                        <Input type="text" placeholder="Job Title" />
                    </div>
                    <div>
                        <Label
                            className={labelClassName}
                            htmlFor="employerAddress"
                        >
                            Employer Address
                        </Label>
                        <Input type="text" placeholder="Employer Address" />
                    </div>
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

export default EmploymentPage;
