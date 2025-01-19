"use client"
import { IListSimple } from "@/src/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import BackHomeButton from "../components/backhomebutton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DatePicker from "../components/datepicker";



export default function Page() {
    const queryClient = useQueryClient();
    const [date, updateDate] = useState<Date | undefined>(new Date(Date.now()));
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["get_request_list"],
        queryFn: async () => {
            if (!date) { throw Error("No date provided") }
            const { data: queryResult } = await axios.get(`/api/list?time=${date.getTime()}`);
            return queryResult["data"] as IListSimple;
        },
        enabled: false
    });

    const list = useMemo(() => {
        if (data) {
            return data.filter((obj, index, self) => index === self.findIndex((other) => (other.user.name === obj.user.name && other.meal == obj.meal)));
        }
        else {
            return [];
        }
    }, [data]);

    // Date changed
    useEffect(() => {
        queryClient.cancelQueries({ queryKey: ["get_request_list"] })
        refetch();
    }, [date, refetch]);

    return (
        <>
            <BackHomeButton />
            <div>
                <h2 className="mt-3 mb-2 font-bold text-l">Request List</h2>
                {/* <h1>{getDayOfWeek(date.getDay())}, {getMonth(date.getMonth())} {date.getDate()} {date.getFullYear()}</h1> */}
                <DatePicker date={date} setDate={updateDate} />
                { isLoading && <div className="mt-4">Loading...</div> }
                { !isLoading && list &&
                    <div className="flex flex-col gap-4 mt-4">
                        {/* Lunch */}
                        <div>
                            <h3>Lunch</h3>
                            <Table className="overflow-x-scroll">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-min">Name</TableHead>
                                        <TableHead className="text-left">Meal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {list.filter((value) => value.meal === "lunch").map(({ user, meal }) => (
                                        <TableRow key={`${user.name}_${meal}`}>
                                            <TableCell key={`${user.name}_${meal}_name`}>{user.name}</TableCell>
                                            <TableCell key={`${user.name}_${meal}_meal`}>{meal}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {/* Dinner */}
                        <div>
                            <h3>Dinner</h3>
                            <Table className="overflow-x-scroll">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-min">Name</TableHead>
                                        <TableHead className="text-left">Meal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {list.filter((value) => value.meal === "dinner").map(({ user, meal }) => (
                                        <TableRow key={`${user.name}_${meal}`}>
                                            <TableCell key={`${user.name}_${meal}_name`}>{user.name}</TableCell>
                                            <TableCell key={`${user.name}_${meal}_meal`}>{meal}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}