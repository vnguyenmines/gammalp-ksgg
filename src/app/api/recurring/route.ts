import PRISMA from "@/prisma";
import { RecurringRequest } from "@/types";
import getUserSession from "@/util/getsession";
import { NextResponse } from "next/server";

/**
 * Gets all the users' recurring requessts
 */
export async function GET() {
    // Get user's session
    const SESSION = await getUserSession();
    if (!SESSION.user || !SESSION.user.email) { return NextResponse.json({ message: "No user info found in session" }, { status: 400 }); }
    const USER_EMAIL = SESSION.user.email;

    const RECURRING_REQUESTS = await PRISMA.recurringrequest.findMany({
        where: {
            user: {
                email: USER_EMAIL
            }
        },
        select: {
            meal: true,
            day: true,
        }
    });
    return NextResponse.json(RECURRING_REQUESTS, { status: 200 });
}

/**
 * Creates a new recurring food request
 */
export async function POST(req: Request) {
    // Request body
    const PAYLOAD = await req.json() as RecurringRequest;
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
    const USER_ID = USER.id;

    // Clear all the user's previous recurring entries
    await PRISMA.recurringrequest.deleteMany({
        where: {
            userid: USER_ID
        }
    });
    const RECURRING_REQUESTS = PAYLOAD.map(({ day, meal }) => {
        return { userid: USER_ID, day: day, meal: meal };
    });
    await PRISMA.recurringrequest.createMany({
        data: RECURRING_REQUESTS
    });

    return NextResponse.json({ id: USER_ID }, { status: 200 });
}