import { Card } from "@/components/ui/card";
import { KYCProvider } from "./context/KYCContext";

export default function KYCLayout({ children }: { children: React.ReactNode }) {
    return (
        <KYCProvider>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-4xl p-8 bg-white">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-primary">
                            Account Verification
                        </h1>
                        <p className="text-secondary-500">
                            Please complete all steps to verify your identity
                        </p>
                    </div>
                    {children}
                </Card>
            </div>
        </KYCProvider>
    );
}
