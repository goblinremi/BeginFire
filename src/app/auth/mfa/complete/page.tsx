import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

const CompleteMFAPage = () => {
    return (
        <div className="w-full py-12 flex flex-col items-center justify-between h-full">
            <div className="h-2/3 text-center mt-12 flex flex-col items-center justify-center">
                <Icons.solidCheckCircle className="w-14 h-14 text-primary-neon" />
                <h1>2FA Enabled!</h1>
                <p className="mt-2 text-sm text-gray-500">
                    We&apos;ll ask for a code every time you want to log in or
                    withdraw funds in the future.
                </p>
            </div>
            <Link href="/onboard/kyc/start" className="w-full">
                <Button variant="neon" size="lg" className="w-full">
                    Done
                </Button>
            </Link>
        </div>
    );
};

export default CompleteMFAPage;
