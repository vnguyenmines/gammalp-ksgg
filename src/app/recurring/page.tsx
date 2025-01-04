// Recurring food request form page
"use client"
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type RecurringForm = {
    mondayLunch: boolean,
    mondayDinner: boolean,
    tuesdayLunch: boolean,
    tuesdayDinner: boolean,
    wednesdayLunch: boolean,
    wednesdayDinner: boolean,
    thursdayLunch: boolean,
    thursdayDinner: boolean,
    fridayLunch: boolean,
    fridayDinner: boolean,
}

export default function Page() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RecurringForm>();

    const formSubmit: SubmitHandler<RecurringForm> = (data) => console.log(data);

    return (
        <>
            <Link href={"/"}>👈 Back home</Link>
            <h1>Recurring food request form</h1>
            Check all of the 
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
                            <td><input type="checkbox" defaultChecked={false} {...register("mondayLunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("mondayDinner")} /></td>
                        </tr>
                        <tr>
                            <th>Tuesday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("tuesdayLunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("tuesdayDinner")} /></td>
                        </tr>
                        <tr>
                            <th>Wednesday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("wednesdayLunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("wednesdayDinner")} /></td>
                        </tr>
                        <tr>
                            <th>Thursday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("thursdayLunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("thursdayDinner")} /></td>
                        </tr>
                        <tr>
                            <th>Friday</th>
                            <td><input type="checkbox" defaultChecked={false} {...register("fridayLunch")} /></td>
                            <td><input type="checkbox" defaultChecked={false} {...register("fridayDinner")} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Save changes</button>
            </form>
        </>
    );
}