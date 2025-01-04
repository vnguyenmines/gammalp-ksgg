import { IRecurringForm, RecurringRequest } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast"

export default function RecurringForm({ defaultValues }: { defaultValues: IRecurringForm }) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IRecurringForm>({
        defaultValues: defaultValues
    });
    const mutation = useMutation({
        mutationKey: ["post_recurring_requests"],
        mutationFn: async (updatedRecurring: RecurringRequest) => {
            const { data } = await axios.post("/api/recurring", updatedRecurring);
            console.log(data);
            return data;
        }
    });

    const formSubmit: SubmitHandler<IRecurringForm> = (data) => {
        console.log(data);
        const NEW_RECURRING_REQUEST: RecurringRequest = []
        Object.entries(data).map((value) => {
            const fieldName = value[0];
            const enabled = value[1];
            const splitString = fieldName.split("_");
            if (enabled) {
                NEW_RECURRING_REQUEST.push({ day: splitString[0] as "monday" | "tuesday" | "wednesday" | "thursday" | "friday", meal: splitString[1] as "lunch" | "dinner" })
            }
        });
        console.log(NEW_RECURRING_REQUEST);

        mutation.mutate(NEW_RECURRING_REQUEST);
    };

        useEffect(() => {
            toast.dismiss();
            if (mutation.isPending) { toast.loading("Saving changes"); }
            if (mutation.isSuccess) { toast.success("Saved preferences"); }
        }, [mutation.isPending, mutation.isSuccess]);

    return (
        <>
            <Toaster position="top-center" />
            <form onSubmit={handleSubmit(formSubmit)}>
                <table className="border-2">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Monday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("monday_lunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("monday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th>Tuesday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("tuesday_lunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("tuesday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th>Wednesday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("wednesday_lunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("wednesday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th>Thursday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("thursday_lunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("thursday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th>Friday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("friday_lunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("friday_dinner")} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Save changes</button>
            </form>
        </>
    );
}