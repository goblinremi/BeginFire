"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { forwardRef } from "react";

interface DatePickerFormProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
}

export const DatePickerForm = forwardRef<
    HTMLButtonElement,
    DatePickerFormProps
>(({ value, onChange, placeholder = "Pick a date" }, ref) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    ref={ref}
                    variant={"outline"}
                    className={cn(
                        "flex font-medium h-13 w-full rounded-lg border-[#D9D9D9] border-[1px] bg-white p-4 text-black transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-sm justify-start",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value ? (
                        format(value, "PPP")
                    ) : (
                        <span className="text-placeholder">{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
});

DatePickerForm.displayName = "DatePickerForm";
