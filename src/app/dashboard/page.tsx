import { withAuth } from "@/components/withAuth";
import { User } from "@supabase/supabase-js";

export default withAuth(function DashboardPage({ user }: { user: User }) {
    return <p>Hello {user.email}</p>;
});
