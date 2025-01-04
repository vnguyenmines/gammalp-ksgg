// Recurring food request form page
"use client"
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type RecurringForm = {

}

export default function Page() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RecurringForm>();

    const formSubmit: SubmitHandler<RecurringForm> = (data) => console.log(data);

    return (
        <>
            <Link href={"/"}>Back home</Link>
            <h1>Recurring food request form</h1>
            <form onSubmit={handleSubmit(formSubmit)}>
                
            </form>
        </>
    );
}