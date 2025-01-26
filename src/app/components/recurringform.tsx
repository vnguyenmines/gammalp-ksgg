import { IRecurringForm, RecurringRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast"
import "../globals.css";
import { Button } from "@/components/ui/button";

export default function RecurringForm({ defaultValues }: { defaultValues: IRecurringForm }) {
    const { register, handleSubmit } = useForm<IRecurringForm>({
        defaultValues: defaultValues
    });
    const mutation = useMutation({
        mutationKey: ["post_recurring_requests"],
        mutationFn: async (updatedRecurring: RecurringRequest) => {
            const { data } = await axios.post("/api/recurring", updatedRecurring);
            return data;
        }
    });

    const formSubmit: SubmitHandler<IRecurringForm> = (data) => {
        const NEW_RECURRING_REQUEST: RecurringRequest = []
        Object.entries(data).map((value) => {
            const fieldName = value[0];
            const enabled = value[1];
            const splitString = fieldName.split("_");
            if (enabled) {
                NEW_RECURRING_REQUEST.push({ day: splitString[0] as "monday" | "tuesday" | "wednesday" | "thursday" | "friday", meal: splitString[1] as "lunch" | "dinner" })
            }
        });

        mutation.mutate(NEW_RECURRING_REQUEST);
    };

    useEffect(() => {
        toast.dismiss();
        if (mutation.isPending) { toast.loading("Saving changes"); }
        if (mutation.isSuccess) { toast.success("Saved preferences"); }
    }, [mutation.isPending, mutation.isSuccess]);

    const CELL_BODY_STYLE = "text-left px-4 py-2";

    return (
        <>
            <Toaster position="top-center" />
            <form onSubmit={handleSubmit(formSubmit)}>
                <table id="recurring-form" className="border-2">
                    <thead>
                        <tr>
                            <th className={`${CELL_BODY_STYLE}`}></th>
                            <th className={`${CELL_BODY_STYLE}`}>Lunch</th>
                            <th className={`${CELL_BODY_STYLE}`}>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className={`${CELL_BODY_STYLE}`}>Monday</th>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("monday_lunch")} /></td>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("monday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th className={`${CELL_BODY_STYLE}`}>Tuesday</th>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("tuesday_lunch")} /></td>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("tuesday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th className={`${CELL_BODY_STYLE}`}>Wednesday</th>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("wednesday_lunch")} /></td>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("wednesday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th className={`${CELL_BODY_STYLE}`}>Thursday</th>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("thursday_lunch")} /></td>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("thursday_dinner")} /></td>
                        </tr>
                        <tr>
                            <th className={`${CELL_BODY_STYLE}`}>Friday</th>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("friday_lunch")} /></td>
                            <td className={`${CELL_BODY_STYLE}`}><input type="checkbox" defaultChecked={false} {...register("friday_dinner")} /></td>
                        </tr>
                    </tbody>
                </table>
                <Button className="mt-5" type="submit">Save changes</Button>
            </form>
        </>
    );
}