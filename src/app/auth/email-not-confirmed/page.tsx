import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../actions";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
export default async function EmailNotConfirmedPage() {
    return (
        <div className="flex flex-col justify-center h-full">
            <Icons.starBox className="w-12 mb-6 h-12 text-primary" />
            <div className="mb-8">
                <p className="font-semibold text-[32px]">Email Confirmation</p>
                <p className="font-medium  text-neutral">
                    Please check your email for a verification link.
                </p>
            </div>

            <Button
                size="lg"
                className="mt-4 w-full bg-primary hover:bg-primary-600"
            >
                Resend verification email
            </Button>
            <p className="w-full text-center font-medium mt-4 text-neutral">
                Need help?{" "}
                <Link href="/contact">
                    <span className="font-bold text-black">Contact us</span>
                </Link>
            </p>
        </div>
    );
}
