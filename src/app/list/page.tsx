"use client"
import { getDayOfWeek, getMonth, IListSimple } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import BackHomeButton from "../components/backhomebutton";



export default function Page() {
    const [date] = useState<Date>(new Date(Date.now()));
    const { data, isLoading } = useQuery({
        queryKey: ["get_request_list"],
        queryFn: async () => {
            const CURRENT_TIME = Date.now();
            // const CURRENT_TIME = 1736180000000;
            const { data: queryResult} = await axios.get(`/api/list?time=${CURRENT_TIME}`);
            return queryResult["data"] as IListSimple;
        }
    });

    const list = useMemo(() => {
        if (data) {
            return data.filter((obj, index, self) => index === self.findIndex((other) => (other.user.name === obj.user.name && other.meal == obj.meal)));
        }
        else {
            return [];
        }
    }, [data]);

    return (
        <>
            <BackHomeButton />
            <div>
                <h2 className="mt-3 font-bold text-l">Request List</h2>
                <h1>{getDayOfWeek(date.getDay())}, {getMonth(date.getMonth())} {date.getDate()} {date.getFullYear()}</h1>
                { isLoading && <div>Loading...</div> }
                {list &&
                    <div className="flex flex-col gap-3">
                        {/* Lunch */}
                        <div>
                            <h3>Lunch</h3>
                            {list.filter((value) => value.meal === "lunch").map(({ user, meal }) => {
                                return <div key={`${user}_${meal}`}>{user.name} - {meal}</div>
                            })}
                        </div>
                        {/* Dinner */}
                        <div>
                            <h3>Dinner</h3>
                            {list.filter((value) => value.meal === "dinner").map(({ user, meal }) => {
                                return <div key={`${user}_${meal}`}>{user.name} - {meal}</div>
                            })}
                        </div>
                    </div>
                }
            </div>
        </>
    );
}