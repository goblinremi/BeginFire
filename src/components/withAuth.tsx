import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return async function AuthenticatedComponent(props: P) {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.getUser();

        const { data: mfaData, error: mfaError } =
            await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

        console.log("MFA DATA IS", mfaData);
        console.log("MFA ERROR IS", mfaError);

        if (error || !data?.user) {
            redirect("/auth/login");
        }
        if (mfaError) {
            console.log("MFA ERROR IS", mfaError);
            redirect("/auth/login");
        }
        if (mfaData) {
            // if user has enrolled, but is not verified, redirect to verify page
            if (
                mfaData.nextLevel === "aal2" &&
                mfaData.nextLevel !== mfaData.currentLevel
            ) {
                redirect("/auth/mfa/verify");
            } else if (mfaData.nextLevel === "aal1") {
                // if user has not enrolled, redirect to enrollment start
                redirect("/auth/mfa/start");
            }
        }
        // user is logged in and has MFA verified by this point

        const { data: profile } = await supabase
            .from("profiles")
            .select("onboarding_status")
            .eq("id", data.user.id)
            .single();

        if (profile?.onboarding_status === "IN_PROGRESS") {
            redirect("/onboard/kyc/identity"); // 🚀 Redirect to onboarding page
            //TODO: save onboarding step?
        }

        return <WrappedComponent {...props} user={data.user} />;
    };
}
