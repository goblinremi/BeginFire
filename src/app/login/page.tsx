import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
export default async function LoginPage() {
    // don't need redirect after login here because the user should be redirected to the onboarding page after email verification
    // or by default to root in login/actions.ts
    return (
        <div className="flex flex-col justify-center h-full">
            <Icons.starBox className="w-12 mb-6 h-12 text-primary" />
            <div className="mb-8">
                <p className="font-semibold text-[32px]">Create an account</p>
                <p className="font-medium  text-neutral">
                    Start investing in your future today.
                </p>
            </div>

            <form className="w-full">
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

                <div className="flex gap-y-2 flex-col mt-8">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full"
                    />
                    {/* <p className="text-xs text-placeholder">Supporting text</p> */}
                </div>

                <Button
                    size="lg"
                    formAction={signup}
                    className="mt-8 w-full bg-primary hover:bg-primary-600"
                >
                    Continue
                </Button>
                <p className="w-full text-center font-medium mt-4 text-neutral">
                    Already have an account?{" "}
                    <Link href="/login">
                        <span className="font-bold text-black">Log in</span>
                    </Link>
                </p>
                {/* <Button
                    className="w-full bg-primary hover:bg-primary-600"
                    formAction={login}
                >
                    Login
                </Button> */}
            </form>
        </div>
    );
}
