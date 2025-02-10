import { Icons } from "@/components/ui/icons";
import Link from "next/link";

const TopNavHeader = ({
    title,
    backLink,
}: {
    title: string;
    backLink: string;
}) => {
    return (
        <div className="fixed top-4 left-0 w-full flex justify-between items-center p-4 border-b-[1px] border-b-offwhite">
            <Link href={backLink}>
                <Icons.arrowLeft className="w-4 h-4 text-neutral" />
            </Link>
            <p className="font-semibold">{title}</p>
            <Icons.x className="w-4 h-4 text-neutral" />
        </div>
    );
};

export default TopNavHeader;
