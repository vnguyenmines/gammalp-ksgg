"use client"
import { getDayOfWeek, getMonth, IListSimple } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";



export default function Page() {
    const [date, updateDate] = useState<Date>(new Date(Date.now()));
    const { data } = useQuery({
        queryKey: ["get_request_list"],
        queryFn: async () => {
            // const CURRENT_TIME = Date.now();
            const CURRENT_TIME = 1736180000000;
            const { data: queryResult} = await axios.get(`/api/list?time=${CURRENT_TIME}`);
            console.log(queryResult["data"]);
            return queryResult["data"] as IListSimple;
        }
    });

    return (
        <div>
            <h2 className="mt-3 font-bold text-l">Request List</h2>
            <h1>{getDayOfWeek(date.getDay())}, {getMonth(date.getMonth())} {date.getDate()} {date.getFullYear()}</h1>
            {/* Lunch */}
            {data && 
                <>
                    {data.map(({ user, meal }) => {
                        return <div>{user.name} - {meal}</div>
                    })}
                </>
            }
            {/* Dinner */}
        </div>
    );
}