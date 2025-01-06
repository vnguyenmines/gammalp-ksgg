import PRISMA from "@/prisma";
import { dayoftheweek, getDayOfWeek } from "@/src/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req - search params in the URL of the request
 *  time: the current millisecond epoch (using Date.now()) of the day we want to retrieve requests for
 * @returns 
 */
export async function GET(req: NextRequest) {
    const SEARCH_PARAMS = req.nextUrl.searchParams;

    // Params
    const time = Number(SEARCH_PARAMS.get("time"));
    if (time) {
        const date = new Date(time);
        const dayofweek = getDayOfWeek(date.getDay()).toLowerCase();
        console.log(dayofweek);

        const recurringRequests = await PRISMA.recurringrequest.findMany({
            where: {
                day: dayofweek as dayoftheweek
            },
            select: {
                user: {
                    select: {
                        name: true
                    }
                },
                meal: true,
            }
        });

        const oneTimeRequests = await PRISMA.onetimerequest.findMany({
            where: {
                date: date
            },
            select: {
                user: {
                    select: {
                        name: true
                    }
                },
                meal: true,
            }
        });
        
        const RESPONSE_PAYLOAD = [...recurringRequests, ...oneTimeRequests];
        // return NextResponse.json({ data: recurringRequests }, { status: 200 });
        return NextResponse.json({ data: RESPONSE_PAYLOAD }, { status: 200 });
    }

    return NextResponse.json({ message: "successfully connected" }, { status: 200 });
}