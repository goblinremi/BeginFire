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
