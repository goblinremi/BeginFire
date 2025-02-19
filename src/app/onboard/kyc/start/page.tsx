import Image from "next/image";
import fingerprintImage from "../../../../../public/fingerprint.png";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const info = [
    {
        title: "Quick and easy",
        description: "The process is simple and only takes a few minutes.",
        icon: <Icons.bolt className="w-8 h-8 text-primary" />,
    },
    {
        title: "Data safely stored",
        description:
            "Information you provide is only used for verification and is stored securely.",
        icon: <Icons.shield className="w-8 h-8 text-primary" />,
    },
];
const KYCStartPage = () => {
    return (
        <div className="flex flex-col justify-between h-full py-12">
            <div className="flex flex-col items-center">
                <Image
                    className="mb-12"
                    src={fingerprintImage}
                    alt="KYC Start"
                />
                <h1 className="mb-8">
                    We need to verify your identity before we continue
                </h1>
                <div className="flex flex-col gap-y-2">
                    {info.map((item) => (
                        <div
                            key={item.title}
                            className="p-4 justify-between flex border-1 border-offwhite rounded-lg"
                        >
                            <div className="flex flex-col gap-y-1">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-neutral">
                                    {item.description}
                                </p>
                            </div>
                            {item.icon}
                        </div>
                    ))}
                </div>
                <p className="text-sm text-neutral text-center mt-12">
                    By pressing the button below, you agree to our{" "}
                    <Link href="/terms" className="text-black underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-black underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
            <Link href="/onboard/kyc/identity">
                <Button variant="neon" size="lg" className="w-full">
                    Get Started
                </Button>
            </Link>
        </div>
    );
};

export default KYCStartPage;
