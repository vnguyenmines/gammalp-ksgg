// Recurring food request form page
"use client"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios"
import RecurringForm from "../components/recurringform";
import { IRecurringForm, RecurringRequest } from "@/src/types";
import { useMemo } from "react";

export default function Page() {
    const query = useQuery({
        queryKey: ["get_recurring_requests"],
        queryFn: async () => {
            const { data } = await axios.get("/api/recurring");
            console.log(data);
            return data as RecurringRequest;
        },
        refetchOnWindowFocus: true,
    });

    const recurringFormDefaultValues = useMemo<IRecurringForm | undefined>(() => {
        if (query.data) {
            let recurringFormFields: IRecurringForm = {
                monday_lunch: false,
                monday_dinner: false,
                tuesday_lunch: false,
                tuesday_dinner: false,
                wednesday_lunch: false,
                wednesday_dinner: false,
                thursday_lunch: false,
                thursday_dinner: false,
                friday_lunch: false,
                friday_dinner: false,
            };
            query.data.forEach(({ day, meal }) => {
                recurringFormFields[`${day}_${meal}`] = true;
            });

            return recurringFormFields;
        }
        else {
            return undefined;
        }
    }, [query.data]);

    return (
        <>
            <Link href={"/"}>👈 Back home</Link>
            <h1>Recurring food request form</h1>
            {/* Check all of the  */}
            {(query.isSuccess && !query.isError && !query.isFetching && recurringFormDefaultValues) ? <RecurringForm defaultValues={recurringFormDefaultValues} /> : <div>Loading...</div>}
        </>
    );
}