import { Button } from "@/components/ui/button";
import { signout } from "@/app/auth/actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a setting" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ProfileSettings;
