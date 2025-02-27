import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

const IdVerificationIntroPage = () => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col space-y-8">
                <div>
                    <h1>Get your ID ready</h1>
                    <p className="text-neutral mt-2 font-medium text-sm">
                        We need to verify your identity with a photo before we
                        can complete your application.
                    </p>
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">
                        Identification Document
                    </p>
                    <div className="flex flex-col space-y-2">
                        <div className="p-4 border-1 border-offwhite rounded-md flex flex-row space-x-3">
                            <Icons.passport className="w-10 h-10" />
                            <div>
                                <p className="text-sm font-medium">Passport</p>
                                <p className="text-xs text-neutral">
                                    Issued in the United States
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="p-4 border-1 border-offwhite rounded-md flex flex-row space-x-3">
                            <Icons.driverLicense className="w-10 h-10" />
                            <div>
                                <p className="text-sm font-medium">
                                    Driver&apos;s License
                                </p>
                                <p className="text-xs text-neutral">
                                    Issued in the United States
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="p-4 border-1 border-offwhite rounded-md flex flex-row space-x-3">
                            <Icons.idCard className="w-10 h-10" />
                            <div>
                                <p className="text-sm font-medium">
                                    Government Issued ID Card
                                </p>
                                <p className="text-xs text-neutral">
                                    Issued in the United States
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link href="/onboard/kyc/id-verification">
                <Button variant="neon" size="lg" className="w-full">
                    Continue
                </Button>
            </Link>
        </div>
    );
};

export default IdVerificationIntroPage;
