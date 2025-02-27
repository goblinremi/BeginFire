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
import { affiliationsFormSchema, type AffiliationsFormData } from "../../types";

const labelClassName = "text-sm font-medium mb-2 text-neutral";

const AffiliationPage = () => {
    const { data, updateStepData, nextStep } = useKYC();

    const form = useForm<AffiliationsFormData>({
        resolver: zodResolver(affiliationsFormSchema),
        defaultValues: {
            affiliatedWithBrokerDealer:
                data.affiliations.affiliatedWithBrokerDealer,
            isShareholderOrSeniorExecutive:
                data.affiliations.isShareholderOrSeniorExecutive,
            isSeniorPoliticalFigure: data.affiliations.isSeniorPoliticalFigure,
            isFamilyMemberOfSeniorPoliticalFigure:
                data.affiliations.isFamilyMemberOfSeniorPoliticalFigure,
            isNoneOfTheAbove: data.affiliations.isNoneOfTheAbove,
        },
        mode: "onSubmit",
    });

    const onSubmit = (values: AffiliationsFormData) => {
        updateStepData("affiliations", values, true);
        nextStep();
    };

    const onError = (errors: FieldErrors<AffiliationsFormData>) => {
        console.log(errors);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="h-full justify-between flex flex-col"
            >
                <div className="space-y-4">
                    <h4 className="text-center">
                        Do any of the following apply to you or a member of your
                        immediate family?
                    </h4>
                    <FormField
                        control={form.control}
                        name="affiliatedWithBrokerDealer"
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
                                        Affiliated or work with a US registered
                                        broker-dealer or FINRA.
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isShareholderOrSeniorExecutive"
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
                                        Senior executive at or a 10% or greater
                                        shareholder of a publicly traded
                                        company.
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isSeniorPoliticalFigure"
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
                                        I am a senior political figure.
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isFamilyMemberOfSeniorPoliticalFigure"
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
                                        I am a family member or relative of a
                                        senior political figure.
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isNoneOfTheAbove"
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
                                        None of the above.
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

export default AffiliationPage;
