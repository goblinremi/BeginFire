"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";
export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="py-12 px-4 h-full flex flex-col items-center justify-between">
            <div className="mt-20 space-y-8">
                <div className="text-center space-y-4">
                    <Icons.solidCheckCircle className="mx-auto h-14 w-14 text-primary-neon" />
                    <h2 className="text-3xl font-bold text-gray-900">
                        Successfully submitted!
                    </h2>
                    <p className="text-neutral text-sm">
                        Thank you for completing your KYC application. We will
                        review your information and get back to you shortly.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="text-sm text-neutral">
                        <p>What happens next?</p>
                        <ul className="list-disc list-inside mt-2 space-y-2">
                            <li>Our team will review your application</li>
                            <li>
                                You will receive an email confirmation within 24
                                hours
                            </li>
                            <li>
                                Additional verification may be required in some
                                cases
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Button
                variant="neon"
                size="lg"
                className="w-full"
                onClick={() => router.push("/dashboard")}
            >
                Go to Dashboard
            </Button>
        </div>
    );
}
