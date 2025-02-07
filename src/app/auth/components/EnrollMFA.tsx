"use client";
import { useState } from "react";
import { challengeMFA, unenrollMFA, verifyMFA } from "../actions";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * EnrollMFA shows a simple enrollment dialog. When shown on screen it calls
 * the `enroll` API. Each time a user clicks the Enable button it calls the
 * `challenge` and `verify` APIs to check if the code provided by the user is
 * valid.
 */
interface Props {
    factorId: string;
    qrCode: string;
}

export default function EnrollMFA({ factorId, qrCode }: Props) {
    const [verifyCode, setVerifyCode] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onEnableClicked = async () => {
        setError("");
        setIsLoading(true);

        try {
            const { challengeId } = await challengeMFA(factorId);

            await verifyMFA({
                factorId,
                challengeId,
                code: verifyCode,
            });

            redirect("/onboard/kyc");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Verification failed"
            );
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelled = async () => {
        await unenrollMFA(factorId);
        redirect("/");
    };

    return (
        <div className="w-full">
            <div className="flex justify-center mb-6">
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
            </div>

            <p className="text-sm text-neutral mb-6 text-center">
                Scan this QR code with your authenticator app (like Google
                Authenticator or Authy) and enter the verification code below.
            </p>

            {error && (
                <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <Input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.trim())}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="text-center text-lg tracking-wider"
                />

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={handleCancelled}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="lg"
                        onClick={onEnableClicked}
                        disabled={verifyCode.length !== 6 || isLoading}
                        className="flex-1 bg-primary hover:bg-primary-600"
                    >
                        {isLoading ? "Verifying..." : "Enable 2FA"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
