import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type { ReactNode } from "react";
import { User } from "@supabase/supabase-js";

export async function withAuth(
    Component: (props: { user: User }) => ReactNode
) {
    return async function ProtectedPage() {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
            redirect("/login");
        }

        return <Component user={data.user} />;
    };
}
