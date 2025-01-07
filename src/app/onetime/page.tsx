// One time food request form page
"use client"
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { meal, OneTimeRequest } from "@/src/types";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import DatePicker from "../components/datepicker";
import BackHomeButton from "../components/backhomebutton";

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
    const [meal, setMeal] = useState<meal>();
    const { mutate } = useMutation({
        mutationKey: ["post_one_time_request"],
        mutationFn: async (formInfo: OneTimeRequest) => {
            const { data, status } = await axios.post("/api/onetime", formInfo, { validateStatus: () => true });
            if (status != 200) { toast.error(data.message); }
            else { toast.success("Request successfully submitted"); }
        }
    });

    function submitOneTimeForm(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if (date == undefined || meal == undefined) { toast.error("Please fill out all fields"); }
        else {
            mutate({
                date: date,
                meal: meal,
            });
        }
    }

    return (
        <>
            <Toaster position="top-center" />
            <BackHomeButton />
            <h1>One-time request form</h1>
            <div className="flex flex-col gap-4">
                <DatePicker date={date} setDate={setDate} />
                <SelectMeal value={meal} setValue={setMeal} />
                <Button className="w-min" onClick={submitOneTimeForm}>Submit</Button>
            </div>
        </>
    );
}

function SelectMeal({ value, setValue }: { value: meal | undefined, setValue: Dispatch<SetStateAction<meal | undefined>> }) {
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
                                        // setValue(currentValue === value ? "" : currentValue)
                                        setValue(currentValue as meal)
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