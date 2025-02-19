"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useKYC } from "../../context/KYCContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
];

const AddressPage = () => {
    const { data, updateData, nextStep, previousStep } = useKYC();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            nextStep();
        }
    };

    const updateAddress = (
        field: keyof typeof data.residentialAddress,
        value: string
    ) => {
        updateData({
            residentialAddress: {
                ...data.residentialAddress,
                [field]: value,
            },
        });
    };

    return (
        <div className="space-y-8">
            {/* 
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="street1">Street Address</Label>
                        <Input
                            id="street1"
                            value={data.residentialAddress.street1}
                            onChange={(e) =>
                                updateAddress("street1", e.target.value)
                            }
                            placeholder="123 Main St"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="street2">
                            Apartment, suite, etc. (optional)
                        </Label>
                        <Input
                            id="street2"
                            value={data.residentialAddress.street2}
                            onChange={(e) =>
                                updateAddress("street2", e.target.value)
                            }
                            placeholder="Apt 4B"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                value={data.residentialAddress.city}
                                onChange={(e) =>
                                    updateAddress("city", e.target.value)
                                }
                                placeholder="New York"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                                id="zipCode"
                                value={data.residentialAddress.zipCode}
                                onChange={(e) =>
                                    updateAddress("zipCode", e.target.value)
                                }
                                placeholder="10001"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={previousStep}
                    >
                        Back
                    </Button>
                    <Button type="submit" disabled={!isStepValid()}>
                        Continue
                    </Button>
                </div>
            </form> */}
        </div>
    );
};

export default AddressPage;
