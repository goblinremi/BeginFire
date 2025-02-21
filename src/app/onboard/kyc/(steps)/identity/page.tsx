"use client";
import { Button } from "@/components/ui/button";
import { useKYC } from "../../context/KYCContext";
import { Input } from "@/components/ui/input";
import { DatePickerForm } from "../../components/DatePickerForm";
import { PhoneInput } from "@/components/ui/phone-input";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { identityFormSchema, type IdentityFormData } from "../../types";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { errorToJSON } from "next/dist/server/render";

import Autocomplete from "react-google-autocomplete";
import Camera from "../../components/Camera";

const labelClassName = "text-sm font-medium mb-2";

const IdentityPage = () => {
    const { data, updateStepData, nextStep } = useKYC();

    const form = useForm<IdentityFormData>({
        resolver: zodResolver(identityFormSchema),
        defaultValues: {
            firstName: data.identity.firstName,
            middleName: data.identity.middleName,
            lastName: data.identity.lastName,
            dateOfBirth: data.identity.dateOfBirth,
            phone: data.identity.phone,
            ssn: data.identity.ssn,
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmit = (values: IdentityFormData) => {
        console.log("Form submitted with values:", values);
        updateStepData("identity", values, true);
        nextStep();
    };

    const onError = (errors: FieldErrors<IdentityFormData>) => {
        console.log("Validation errors:", errors);
    };

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className="space-y-8"
                    noValidate
                >
                    <div className="flex gap-x-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className={labelClassName}>
                                        First Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="middleName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className={labelClassName}>
                                        Middle Name{" "}
                                        <span className="text-xs text-neutral">
                                            (optional)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Middle Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Last Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Date of Birth
                                </FormLabel>
                                <FormControl>
                                    <DatePickerForm
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ssn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    <div className="flex flex-col">
                                        SSN{" "}
                                        <p className="mb-2 text-xs text-neutral">
                                            SSN is used to help secure your
                                            account and we're legally obliged to
                                            ask before opening your account.
                                            Your info is secured with military
                                            grade encryption.
                                        </p>
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="SSN"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={9}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Autocomplete
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                        onPlaceSelected={(place) => console.log(place)}
                        options={{
                            types: ["street_address"],
                            componentRestrictions: { country: "us" },
                        }}
                        className="w-full"
                    />

                    <Camera />
                    <Button
                        type="submit"
                        className="w-full"
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

export default IdentityPage;
