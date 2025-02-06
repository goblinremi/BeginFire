import { Button } from "@/components/ui/button";
import { signout } from "@/app/auth/actions";
const ProfileSettings = () => {
    return (
        <div>
            ProfileSettings
            <Button
                size="lg"
                onClick={signout}
                className="mt-8 w-full bg-primary hover:bg-primary-600"
            >
                Sign out
            </Button>
        </div>
    );
};

export default ProfileSettings;
