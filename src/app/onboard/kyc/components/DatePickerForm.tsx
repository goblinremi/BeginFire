import * as React from "react";
import { format, startOfYear, endOfYear, eachMonthOfInterval } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
    value?: Date;
    onChange: (date: Date | undefined) => void;
}

export function DatePickerForm({ value, onChange }: DatePickerProps) {
    const [month, setMonth] = React.useState<number>(
        value ? value.getMonth() : new Date().getMonth()
    );
    const [year, setYear] = React.useState<number>(
        value ? value.getFullYear() : new Date().getFullYear()
    );

    const years = React.useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from(
            { length: currentYear - 1900 + 1 },
            (_, i) => currentYear - i
        );
    }, []);

    const months = React.useMemo(() => {
        if (year) {
            return eachMonthOfInterval({
                start: startOfYear(new Date(year, 0, 1)),
                end: endOfYear(new Date(year, 0, 1)),
            });
        }
        return [];
    }, [year]);

    React.useEffect(() => {
        if (value) {
            setMonth(value.getMonth());
            setYear(value.getFullYear());
        }
    }, [value]);

    const handleYearChange = (selectedYear: string) => {
        const newYear = parseInt(selectedYear, 10);
        setYear(newYear);
        if (value) {
            const newDate = new Date(value);
            newDate.setFullYear(newYear);
            onChange(newDate);
        }
    };

    const handleMonthChange = (selectedMonth: string) => {
        const newMonth = parseInt(selectedMonth, 10);
        setMonth(newMonth);
        if (value) {
            const newDate = new Date(value);
            newDate.setMonth(newMonth);
            onChange(newDate);
        } else {
            onChange(new Date(year, newMonth, 1));
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                        "flex h-13 w-full rounded-lg border-[#D9D9D9] border-[1px] bg-white p-4 text-left font-normal transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex justify-between p-2 space-x-1">
                    <Select
                        onValueChange={handleYearChange}
                        value={year.toString()}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={handleMonthChange}
                        value={month.toString()}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((m, index) => (
                                <SelectItem
                                    key={index}
                                    value={index.toString()}
                                >
                                    {format(m, "MMMM")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    month={new Date(year, month)}
                    onMonthChange={(newMonth) => {
                        setMonth(newMonth.getMonth());
                        setYear(newMonth.getFullYear());
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
