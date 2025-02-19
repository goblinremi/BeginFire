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

const FinancialPage = () => {
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
        <form
            onSubmit={handleSubmit}
            className="h-full justify-between flex flex-col"
        >
            <div className="space-y-8">
                <div>
                    <h1 className="mb-2">
                        We need some information about your financial situation
                    </h1>
                    <p className="text-neutral text-sm">
                        Please pick the answers that best describes your
                        financial situation.
                    </p>
                </div>
                <div>
                    <Label className={labelClassName} htmlFor="lastName">
                        Employment Status
                    </Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Employment Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="unemployed">
                                Unemployed
                            </SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className={labelClassName} htmlFor="lastName">
                        Account Funding Source
                    </Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Account Funding Source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="employment_income">
                                Employment Income
                            </SelectItem>
                            <SelectItem value="investments">
                                Investments
                            </SelectItem>
                            <SelectItem value="inheritance">
                                Inheritance
                            </SelectItem>
                            <SelectItem value="business_income">
                                Business Income
                            </SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="family">Family</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className={labelClassName} htmlFor="lastName">
                        Household Income
                    </Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0-20000">0 - $20,000</SelectItem>
                            <SelectItem value="20000-49999">
                                $20,000 - $49,999
                            </SelectItem>
                            <SelectItem value="50000-99999">
                                $50,000 - $99,999
                            </SelectItem>
                            <SelectItem value="100000-499999">
                                $100,000 - $499,999
                            </SelectItem>
                            <SelectItem value="500000-999999">
                                $500,000 - $999,999
                            </SelectItem>
                            <SelectItem value="1000000-9999999">
                                $1,000,000 - $9,999,999
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className={labelClassName} htmlFor="lastName">
                        Investible/Liquid Assets
                    </Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0-20000">0 - $20,000</SelectItem>
                            <SelectItem value="20000-49999">
                                $20,000 - $49,999
                            </SelectItem>
                            <SelectItem value="50000-99999">
                                $50,000 - $99,999
                            </SelectItem>
                            <SelectItem value="100000-499999">
                                $100,000 - $499,999
                            </SelectItem>
                            <SelectItem value="500000-999999">
                                $500,000 - $999,999
                            </SelectItem>
                            <SelectItem value="1000000-9999999">
                                $1,000,000 - $9,999,999
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button type="submit" className="w-full" size="lg" variant="neon">
                Continue
            </Button>
        </form>
    );
};

export default FinancialPage;
