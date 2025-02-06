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

        return <WrappedComponent {...props} user={data.user} />;
    };
}
