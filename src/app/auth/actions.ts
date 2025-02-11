"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log("ERROR FROM LOGIN IS", error);
        switch (error.code) {
            case "email_not_confirmed":
                redirect("/auth/email-not-confirmed");
            case "invalid_credentials":
                redirect("/error");
            default:
                redirect("/error");
        }
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const validatedData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(validatedData);

    if (error) {
        redirect("/error");
    }

    redirect("/auth/email-not-confirmed");
    //revalidatePath("/", "layout");
    // redirect("/");
}

export async function signout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log("ERROR FROM SIGN OUT IS", error);
    }
    redirect("/auth/login");
}

export async function resendEmailVerification(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
            emailRedirectTo: "http://localhost:3000/dashboard",
        },
    });
    if (error) {
        console.log("ERROR FROM RESEND EMAIL VERIFICATION IS", error);
    }
}

export async function enrollMFA() {
    const supabase = await createClient();

    // First check if user already has MFA enrolled
    const { data: factors, error: listError } =
        await supabase.auth.mfa.listFactors();

    if (listError) {
        throw listError;
    }
    console.log("FACTORS FROM ENROLL MFA IS", JSON.stringify(factors));
    // If user already has TOTP factor, unenroll it
    // Is this necessary? Don't know how to retrieve the existing factor QR code
    const existingFactor = factors.totp[0];
    if (existingFactor) {
        const { error: unenrollError } = await supabase.auth.mfa.unenroll({
            factorId: existingFactor.id,
        });
        if (unenrollError) throw unenrollError;
    }

    // create new one
    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        issuer: "BeginFiretest6",
        friendlyName: "shoudl be verified6",
    });

    if (error) {
        console.log("ERROR FROM ENROLL MFA IS", error);
        throw error;
    }

    return {
        factorId: data.id,
        qrCode: data.totp.qr_code,
    };
}
export async function unenrollMFA(factorId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.mfa.unenroll({
        factorId,
    });

    if (error) {
        throw error;
    }

    return {
        success: true,
    };
}

export async function challengeMFA(factorId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.mfa.challenge({
        factorId,
    });

    if (error) {
        throw error;
    }

    return {
        challengeId: data.id,
    };
}

export async function verifyMFA({
    factorId,
    challengeId,
    code,
}: {
    factorId: string;
    challengeId: string;
    code: string;
}) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code,
    });

    console.log(
        "DATA FROM VERIFY MFA backend IS",
        JSON.stringify(data?.user.factors)
    );

    if (error) {
        console.log("ERROR FROM VERIFY MFA IS", error);
        throw error;
    }

    return data;
}

export async function listMFAFactors() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.mfa.listFactors();

    if (error) {
        throw error;
    }

    const totpFactor = data.totp[0];
    if (!totpFactor) {
        throw new Error("No TOTP factors found!");
    }

    return {
        factorId: totpFactor.id,
        verified: totpFactor.status === "verified",
    };
}
