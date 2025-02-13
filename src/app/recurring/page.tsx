// Recurring food request form page
"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import RecurringForm from "../components/recurringform";
import { IRecurringForm, RecurringRequest } from "@/types";
import { useMemo } from "react";
import BackHomeButton from "../components/backhomebutton";

export default function Page() {
    const query = useQuery({
        queryKey: ["get_recurring_requests"],
        queryFn: async () => {
            const { data } = await axios.get("/api/recurring");
            return data as RecurringRequest;
        },
        refetchOnWindowFocus: true,
    });

    const recurringFormDefaultValues = useMemo<IRecurringForm | undefined>(() => {
        if (query.data) {
            const recurringFormFields: IRecurringForm = {
                sunday_lunch: false,
                sunday_dinner: false,
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
                saturday_lunch: false,
                saturday_dinner: false,
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
            <BackHomeButton />
            <h1>Recurring food request form</h1>
            {/* Check all of the  */}
            {(query.isSuccess && !query.isError && !query.isFetching && recurringFormDefaultValues) ? <RecurringForm defaultValues={recurringFormDefaultValues} /> : <div>Loading...</div>}
        </>
    );
}