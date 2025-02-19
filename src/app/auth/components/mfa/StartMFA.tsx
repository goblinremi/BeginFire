import { Icons } from "@/components/ui/icons";
import BottomModalLayout from "../BottomModalLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StartMFA() {
    return (
        <BottomModalLayout>
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-y-2">
                    <h1>Protect your withdrawals by enabling 2FA</h1>
                    <p className="text-sm text-neutral">
                        You&apos;ll need to enter a verification code when
                        logging in and withdrawing funds, making sure only you
                        have access.
                    </p>
                    <div className="flex flex-col gap-y-2 mt-2">
                        <div className="text-sm  flex items-center gap-x-1 font-semibold">
                            <Icons.checkCircle className="w-5 h-5 text-primary" />
                            Set up with Google Authenticator or Authy
                        </div>
                        <div className="text-sm  flex items-center gap-x-1 font-semibold">
                            <Icons.checkCircle className="w-5 h-5 text-primary" />
                            Only takes a minute
                        </div>
                    </div>
                </div>
                <Link href="/auth/mfa/enroll">
                    <Button variant="neon" size="lg" className="w-full">
                        Get started
                    </Button>
                </Link>
            </div>
        </BottomModalLayout>
    );
}
