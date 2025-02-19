"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useKYC } from "../../context/KYCContext";
import { financialFormSchema, type FinancialFormData } from "../../types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    EMPLOYMENT_STATUS_OPTIONS,
    HOUSEHOLD_INCOME_OPTIONS,
    INVESTIBLE_ASSETS_OPTIONS,
    INVESTMENT_EXPERIENCE_OPTIONS,
    ACCOUNT_FUNDING_SOURCE_OPTIONS,
} from "../../constants";

const labelClassName = "text-sm font-medium mb-2";

const FinancialPage = () => {
    const { data, updateStepData, nextStep } = useKYC();

    const form = useForm<FinancialFormData>({
        resolver: zodResolver(financialFormSchema),
        defaultValues: {
            employmentStatus: data.financial.employmentStatus,
            householdIncome: data.financial.householdIncome,
            investibleAssets: data.financial.investibleAssets,
            investmentExperience: data.financial.investmentExperience,
            // riskTolerance: data.financial.riskTolerance,
            // investmentObjectives: data.financial.investmentObjectives,
            // liquidNetWorth: data.financial.liquidNetWorth,
            accountFundingSource: data.financial.accountFundingSource,
            // totalNetWorth: data.financial.totalNetWorth,
        },
        mode: "onSubmit",
    });

    const onSubmit = (values: FinancialFormData) => {
        updateStepData("financial", values, true);
        nextStep();
    };

    const onError = (errors: FieldErrors<FinancialFormData>) => {
        console.log(errors);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="h-full justify-between flex flex-col"
            >
                <div className="space-y-8">
                    <div>
                        <h1 className="mb-2">
                            We need some information about your financial
                            situation
                        </h1>
                        <p className="text-neutral text-sm">
                            Please pick the answers that best describes your
                            financial situation.
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="employmentStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Employment Status
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Employment Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {EMPLOYMENT_STATUS_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="householdIncome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Household Income
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Range" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {HOUSEHOLD_INCOME_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="investibleAssets"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Investible/Liquid Assets
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Range" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {INVESTIBLE_ASSETS_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="investmentExperience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Investment Experience
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Experience Level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {INVESTMENT_EXPERIENCE_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="accountFundingSource"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Account Funding Source
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Funding Source" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {ACCOUNT_FUNDING_SOURCE_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="riskTolerance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassName}>
                                    Risk Tolerance
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Risk Level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="conservative">
                                            Conservative
                                        </SelectItem>
                                        <SelectItem value="moderate">
                                            Moderate
                                        </SelectItem>
                                        <SelectItem value="aggressive">
                                            Aggressive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    {/* TODO: Add multi-select for investment objectives */}
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

export default FinancialPage;
