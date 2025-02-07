"use client";
import { useState } from "react";
import { challengeMFA, verifyMFA, listMFAFactors } from "../actions";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function VerifyMFA() {
    const [verifyCode, setVerifyCode] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitClicked = async () => {
        setError("");
        setIsLoading(true);

        try {
            const { factorId } = await listMFAFactors();
            const { challengeId } = await challengeMFA(factorId);

            await verifyMFA({
                factorId,
                challengeId,
                code: verifyCode,
            });

            redirect("/dashboard");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Verification failed"
            );
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <p className="text-sm text-neutral mb-6 text-center">
                Enter the verification code from your authenticator app to
                continue.
            </p>

            {error && (
                <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-6 flex flex-col items-center justify-center">
                <InputOTP
                    maxLength={6}
                    value={verifyCode}
                    onChange={(value) => setVerifyCode(value)}
                    pattern={REGEXP_ONLY_DIGITS}
                    className="gap-2"
                >
                    <InputOTPGroup className="gap-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <Button
                    size="lg"
                    onClick={onSubmitClicked}
                    disabled={verifyCode.length !== 6 || isLoading}
                    className="w-full bg-primary hover:bg-primary-600"
                >
                    {isLoading ? "Verifying..." : "Continue"}
                </Button>
            </div>
        </div>
    );
}
