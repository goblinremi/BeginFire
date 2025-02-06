import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import SubmitEmailButton from "./SubmitEmailButton";

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
            <form>
                <div className="flex gap-y-2 flex-col">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="w-full"
                    />
                    {/* <p className="text-xs text-placeholder">Supporting text</p> */}
                </div>
                <SubmitEmailButton />
                {/* todo add sent state using useActionState */}
            </form>
            <p className="w-full text-center font-medium mt-4 text-neutral">
                Need help?{" "}
                <Link href="/contact">
                    <span className="font-bold text-black">Contact us</span>
                </Link>
            </p>
        </div>
    );
}
