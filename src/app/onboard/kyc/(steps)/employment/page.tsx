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
import { employmentFormSchema, type EmploymentFormValues } from "../../types";

const labelClassName = "text-sm font-medium mb-2";

const EmploymentPage = () => {
    const { data, updateStepData, nextStep } = useKYC();

    const form = useForm<EmploymentFormValues>({
        resolver: zodResolver(employmentFormSchema),
        defaultValues: {
            employmentStatus: data.employment.employmentStatus,
            employer: data.employment.employer,
            occupation: data.employment.occupation,
            yearsEmployed: data.employment.yearsEmployed,
            annualIncome: data.employment.annualIncome,
            sourceOfIncome: data.employment.sourceOfIncome,
        },
        mode: "onSubmit",
    });

    const onSubmit = (values: EmploymentFormValues) => {
        updateStepData("employment", values, true);
        nextStep();
    };

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="employerName"
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
                                    <Input placeholder="Job Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="employerAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Employer Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Employer Address"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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

export default EmploymentPage;
