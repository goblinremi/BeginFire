import { withAuth } from "@/components/withAuth";
import { User } from "@supabase/supabase-js";
import ProfileSettings from "./components/ProfileSettings";
function DashboardPage({ user }: { user: User }) {
    return (
        <div>
            <p>Hello {user.email}</p>
            <ProfileSettings />
        </div>
    );
}

export default withAuth(DashboardPage);
