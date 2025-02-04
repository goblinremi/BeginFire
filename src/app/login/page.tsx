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
export default async function LoginPage() {
    // don't need redirect after login here because the user should be redirected to the onboarding page after email verification
    // or by default to root in login/actions.ts
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
                <CardHeader className="space-y-4 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-primary">
                        Welcome back
                    </h1>
                    <p className="text-sm text-secondary-500">
                        Please sign in to continue
                    </p>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full"
                            />
                        </div>

                        <Button
                            formAction={login}
                            className="w-full bg-primary hover:bg-primary-600"
                        >
                            Sign In
                        </Button>
                        <Button
                            className="w-full bg-primary hover:bg-primary-600"
                            formAction={signup}
                        >
                            Sign up
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
                    <Button
                        variant="outline"
                        className="w-full"
                        // onClick={() => signInWithGoogle()}
                    >
                        <Icons.google className="mr-2 h-4 w-4" />
                        Continue with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
