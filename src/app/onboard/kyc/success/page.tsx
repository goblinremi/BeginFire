"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-6">
                <div className="text-center space-y-4">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <h2 className="text-3xl font-bold text-gray-900">
                        Application Submitted
                    </h2>
                    <p className="text-gray-600">
                        Thank you for completing your KYC application. We will
                        review your information and get back to you shortly.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="text-sm text-gray-500">
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

                    <Button
                        className="w-full"
                        onClick={() => router.push("/dashboard")}
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
