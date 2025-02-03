"use client";
import { Input } from "@/components/ui/input";
import { DatePickerForm } from "../components/DatePickerForm";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const IdentityPage = () => {
    const inputGroupClassName = "flex flex-col gap-4 w-1/2";
    return (
        <div className="flex h-screen justify-center items-center flex-col gap-y-16">
            <div className={inputGroupClassName}>
                <Input placeholder="First Name" />
                <Input placeholder="Middle Name" />
                <Input placeholder="Last Name" />
                <Input placeholder="Email" />
            </div>
            <div className={inputGroupClassName}>
                <div>Social Security</div>
                <InputOTP
                    pattern={REGEXP_ONLY_DIGITS}
                    maxLength={9}
                    minLength={9}
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
                <DatePickerForm />
            </div>
        </div>
    );
};

export default IdentityPage;
