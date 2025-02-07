import { enrollMFA } from "../../actions";
import EnrollMFA from "../../components/EnrollMFA";
import { Icons } from "@/components/ui/icons";

export default async function EnrollMFAPage() {
    const { factorId, qrCode } = await enrollMFA();

    return (
        <div className="flex flex-col justify-center h-full">
            <Icons.starBox className="w-12 mb-6 h-12 text-primary" />
            <div className="mb-8">
                <p className="font-semibold text-[32px]">
                    Two-Factor Authentication
                </p>
                <p className="font-medium text-neutral">
                    Secure your account with an authenticator app
                </p>
            </div>

            <EnrollMFA factorId={factorId} qrCode={qrCode} />
        </div>
    );
}
