"use client";
import { Button } from "@/components/ui/button";
import { resendEmailVerification } from "../actions";
import { useFormStatus } from "react-dom";

const SubmitEmailButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            formAction={resendEmailVerification}
            size="lg"
            className="mt-4 w-full bg-primary hover:bg-primary-600"
        >
            {pending ? "Sending..." : "Resend verification email"}
        </Button>
    );
};

export default SubmitEmailButton;
