"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "../components/StepIndicator";
import { Label } from "@/components/ui/label";
import { useKYC } from "../context/KYCContext";

const PersonalInfoPage = () => {
    const { data, updateData, nextStep, isStepValid } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    return (
        <div className="space-y-8">
            <StepIndicator currentStep={0} />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={data.firstName}
                                onChange={(e) =>
                                    updateData({ firstName: e.target.value })
                                }
                                placeholder="First Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="middleName">
                                Middle Name (Optional)
                            </Label>
                            <Input
                                id="middleName"
                                value={data.middleName}
                                onChange={(e) =>
                                    updateData({ middleName: e.target.value })
                                }
                                placeholder="Middle Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={data.lastName}
                                onChange={(e) =>
                                    updateData({ lastName: e.target.value })
                                }
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    updateData({ email: e.target.value })
                                }
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) =>
                                    updateData({ phone: e.target.value })
                                }
                                placeholder="(123) 456-7890"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button type="submit" disabled={!isStepValid()}>
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoPage;
