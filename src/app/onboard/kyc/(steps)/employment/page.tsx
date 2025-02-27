"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useKYC } from "../../context/KYCContext";
import { employmentFormSchema, type EmploymentFormData } from "../../types";
import AddressAutocomplete from "../../components/AddressAutocomplete";

const labelClassName = "text-sm font-medium mb-2";

const EmploymentPage = () => {
    const { data, updateStepData, nextStep } = useKYC();

    const form = useForm<EmploymentFormData>({
        resolver: zodResolver(employmentFormSchema),
        defaultValues: {
            employer: data.employment.employer,
            jobTitle: data.employment.jobTitle,
            address: data.employment.address,
            formattedAddress: data.employment.formattedAddress,
            address2: data.employment.address2,
        },
        mode: "onSubmit",
    });

    const onSubmit = (values: EmploymentFormData) => {
        updateStepData("employment", values, true);
        nextStep();
    };

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full flex flex-col justify-between"
                >
                    <div className="space-y-8">
                        <FormField
                            control={form.control}
                            name="employer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassName}>
                                        Employer Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Employer Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassName}>
                                        Job Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Job Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="formattedAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassName}>
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <AddressAutocomplete
                                            onPlaceSelect={(place) => {
                                                form.setValue("address", {
                                                    street1: place.name,
                                                    city: place
                                                        .address_components[3]
                                                        .long_name,
                                                    state: place
                                                        .address_components[5]
                                                        .long_name,
                                                    zipCode:
                                                        place
                                                            .address_components[7]
                                                            .long_name,
                                                });
                                                form.setValue(
                                                    "formattedAddress",
                                                    place.formatted_address
                                                );
                                            }}
                                            formattedAddress={form.getValues(
                                                "formattedAddress"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassName}>
                                        Apartment, suite, etc.
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Address Line 2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full "
                        size="lg"
                        variant="neon"
                    >
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default EmploymentPage;
