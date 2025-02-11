"use client";
import { useState } from "react";
import { challengeMFA, unenrollMFA, verifyFirstFactorMFA } from "../../actions";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTPGroup } from "@/components/ui/input-otp";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

/**
 * EnrollMFA shows a simple enrollment dialog. When shown on screen it calls
 * the `enroll` API. Each time a user clicks the Enable button it calls the
 * `challenge` and `verify` APIs to check if the code provided by the user is
 * valid.
 */
interface Props {
    factorId: string;
    secret: string;
    qrCode: string;
}

export default function EnrollMFA({ factorId, qrCode, secret }: Props) {
    const [verifyCode, setVerifyCode] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onEnableClicked = async () => {
        setError("");
        setIsLoading(true);

        let redirectUrl = "";
        try {
            const { challengeId } = await challengeMFA(factorId);

            const { access_token, token_type } = await verifyFirstFactorMFA({
                factorId,
                challengeId,
                code: verifyCode,
            });
            console.log("ACCESS TOKEN IS", access_token);
            console.log("TOKEN TYPE IS", token_type);
            debugger;

            redirectUrl = "/auth/mfa/complete";
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Verification failed"
            );
            console.log("ERROR FROM ENROLL MFA IS", err);
        } finally {
            setIsLoading(false);
            if (redirectUrl) {
                console.log("REDIRECTING TO", redirectUrl);
                redirect(redirectUrl);
            }
        }
    };

    const handleCancelled = async () => {
        await unenrollMFA(factorId);
        redirect("/");
    };

    return (
        <div className="w-full flex flex-col items-center justify-center text-center">
            <p className="font-semibold text-2xl mt-8">
                Scan the QR Code to enable 2FA
            </p>
            <p className="text-sm font-medium text-neutral mb-2">
                Open your authenticator app and choose scan barcode.
            </p>
            <div className="flex justify-center my-10">
                <img
                    src={qrCode}
                    alt="QR Code"
                    className="w-[170px] h-[170px]"
                />
            </div>

            <div className="text-sm bg-offwhite rounded-lg p-2 w-full mb-2 text-center">
                {secret}
            </div>
            <div
                className="text-sm text-primary-dark cursor-pointer"
                onClick={() => {
                    navigator.clipboard.writeText(secret);
                }}
            >
                Copy
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
                    variant="neon"
                    size="lg"
                    onClick={onEnableClicked}
                    disabled={verifyCode.length !== 6 || isLoading}
                    className="w-full"
                >
                    {isLoading ? "Verifying..." : "Enable 2FA"}
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCancelled}
                    disabled={isLoading}
                    className="w-full"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
