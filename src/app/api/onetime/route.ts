import PRISMA from "@/prisma";
import { OneTimeRequest } from "@/src/types";
import getUserSession from "@/src/util/getsession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Request body
    const PAYLOAD = await req.json() as OneTimeRequest;
    console.log(PAYLOAD);
    // Get user's session
    const SESSION = await getUserSession();
    if (!SESSION.user || !SESSION.user.email) { return NextResponse.json({ message: "No user info found in session" }, { status: 400 }); }
    const USER_EMAIL = SESSION.user.email;

    // Get the user's local id
    const USER = await PRISMA.user.findUnique({
        where: {
            email: USER_EMAIL
        }
    });
    if (!USER) { return NextResponse.json({ message: `User entry for ${USER_EMAIL} is undefined` }, { status: 500 }); }
    console.log(USER);
    const USER_ID = USER.id;
    
    // Verify that a duplicate entry is not in the database
    const ENTRY = await PRISMA.onetimerequest.findUnique({
        where: {
            userid: USER_ID,
            date: PAYLOAD.date,
            meal: PAYLOAD.meal,
        }
    });
    if (ENTRY) { return NextResponse.json({ message: `Duplicate entry for ${PAYLOAD.meal} on ${PAYLOAD.date}` }, { status: 400 }); }
    // Create a new one time entry in database
    else {
        await PRISMA.onetimerequest.create({
            data: {
                date: PAYLOAD.date,
                userid: USER_ID,
                meal: PAYLOAD.meal
            }
        });
        
        return NextResponse.json({}, { status: 200 });
    }
}