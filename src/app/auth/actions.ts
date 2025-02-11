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
        secret: data.totp.secret,
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
// To be used after the first factor is enrolled, to mark the user as starting onboarding.
// For normal verification after login, use verifyMFA
export async function verifyFirstFactorMFA({
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

    if (error) {
        console.log("ERROR FROM VERIFY MFA IS", error);
        throw error;
    }

    // Update profiles to start onboarding
    const userId = data.user.id;
    const existingProfile = await supabase
        .from("profile")
        .select("onboarding_status")
        .eq("id", userId)
        .single();

    console.log("EXISTING PROFILE IS", existingProfile);
    // Verify First Factor MFA is only called after the first factor is enrolled
    // So if the user is not NOT_STARTED, they have already started onboarding
    // and are calling the endpoint incorrectly
    // If it is called incorrectly, we can just return the data without resetting the user into onboarding again
    if (existingProfile.data?.onboarding_status !== "NOT_STARTED") {
        return data;
    }

    const { error: updateError, data: updatedProfile } = await supabase
        .from("profile")
        .update({
            onboarding_status: "IN_PROGRESS",
        })
        .eq("id", userId)
        .select("onboarding_status")
        .single();

    console.log("UPDATED PROFILE IS", updatedProfile);
    if (updateError) {
        console.log("ERROR UPDATING PROFILES IS", updateError);
        throw updateError;
    }
    return {
        ...data,
        onboarding_status: updatedProfile?.onboarding_status,
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
