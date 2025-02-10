import VerifyMFA from "../../components/mfa/VerifyMFA";
import { Icons } from "@/components/ui/icons";

export default function VerifyMFAPage() {
    return (
        <div className="flex flex-col justify-center h-full">
            <Icons.starBox className="w-12 mb-6 h-12 text-primary" />
            <div className="mb-8">
                <p className="font-semibold text-[32px]">
                    Two-Factor Authentication
                </p>
                <p className="font-medium text-neutral">
                    Verify your identity to continue
                </p>
            </div>

            <VerifyMFA />
        </div>
    );
}
