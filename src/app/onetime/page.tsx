// One time food request form page
"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"

const frameworks = [
    {
        value: "lunch",
        label: "Lunch",
    },
    {
        value: "dinner",
        label: "Dinner",
    },
]

export default function Page() {
    const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));
    const [meal, setMeal] = useState("");

    return (
        <>
            <Link href={"/"}>👈 Back home</Link>
            <h1>One-time request form</h1>
            <div className="flex flex-col gap-4">
                <SelectDate date={date} setDate={setDate} />
                <SelectMeal value={meal} setValue={setMeal} />
                <Button className="w-min">Submit</Button>
            </div>
        </>
    );
}

function SelectDate({ date, setDate }: { date: Date | undefined, setDate: Dispatch<SetStateAction<Date | undefined>> }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

function SelectMeal({ value, setValue }: { value: string, setValue: Dispatch<SetStateAction<string>> }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select meal..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}