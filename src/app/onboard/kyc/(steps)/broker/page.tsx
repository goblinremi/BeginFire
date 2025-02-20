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
                                        I have read and understand the{" "}
                                        <a
                                            className="text-blue-500 underline"
                                            href="https://files.alpaca.markets/disclosures/library/AcctAppMarginAndCustAgmt.pdf/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Alpaca Customer Agreement
                                        </a>
                                        <p className="mt-2">
                                            I have read, understand, and agree
                                            to be bound by Alpaca Securities LLC
                                            and beginFIRE account terms, and all
                                            other terms, disclosures, and
                                            disclaimers applicable to me, as
                                            referenced in the Alpaca Customer
                                            Agreement. I also acknowledge that
                                            the Alpaca Customer Agreement
                                            contains a pre-dispute arbitration
                                            clause in Section 43.
                                        </p>
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
                                        By checking this box, I understand I am
                                        signing this agreement electronically,
                                        and that my electronic signature will
                                        have the same effect as physically
                                        signing and returning the Application
                                        Agreement.
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
                    Continue
                </Button>
            </form>
        </Form>
    );
};

export default BrokerPage;
