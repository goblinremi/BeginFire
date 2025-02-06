import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return async function AuthenticatedComponent(props: P) {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
            redirect("/auth/login");
        }
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
