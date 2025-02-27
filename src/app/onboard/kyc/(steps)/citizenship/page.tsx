"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useKYC } from "../../context/KYCContext";
import { brokerFormSchema, type BrokerFormData } from "../../types";

const labelClassName = "text-sm font-medium mb-2 text-neutral";

const BrokerPage = () => {
    const { data, updateStepData, nextStep } = useKYC();

    const form = useForm<BrokerFormData>({
        resolver: zodResolver(brokerFormSchema),
        defaultValues: {
            customerAgreement: data.broker.customerAgreement,
            digitalSignature: data.broker.digitalSignature,
        },
        mode: "onSubmit",
    });

    const onSubmit = (values: BrokerFormData) => {
        updateStepData("broker", values, true);
        nextStep();
    };

    const onError = (errors: FieldErrors<BrokerFormData>) => {
        console.log(errors);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="h-full justify-between flex flex-col"
            >
                <div className="space-y-8">
                    <FormField
                        control={form.control}
                        name="customerAgreement"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start space-x-3 space-y-0">
                                <div className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className={labelClassName}>
                                        By checking this box, I am confirming I
                                        am a tax resident of the United States.
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="digitalSignature"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start space-x-3 space-y-0">
                                <div className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className={labelClassName}>
                                        By checking this box, I am confirming I
                                        am a citizen of the United States.
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="neon"
                >
                    Agree to Terms
                </Button>
            </form>
        </Form>
    );
};

export default BrokerPage;
