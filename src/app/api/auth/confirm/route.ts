import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/auth/mfa/start";
    if (token_hash && type) {
        const supabase = await createClient();

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });

        if (!error) {
            // console.log("NO ERROR");
            // // redirect user to specified redirect URL or root of app
            // //TODO: after confirming email, set user metadata as onboarding in progress
            // const { data } = await supabase.auth.getUser();
            // console.log("DATA FROM confirm route is", data);
            // if (data.user) {
            //     console.log("USER DATA FOUND");
            //     await supabase.from("profile").insert({
            //         id: data.user.id, // Use user's Supabase UUID
            //     });
            //     console.log("USER DATA INSERTED");
            //     redirect(next);
            // } else {
            //     console.log("NO USER DATA");
            // }
            redirect(next);
        }
        console.log("ERROR from email confirmation", error);
    }

    // redirect the user to an error page with some instructions
    redirect("/error");
}
