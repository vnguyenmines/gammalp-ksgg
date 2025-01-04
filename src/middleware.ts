import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";

const publicPages = ["/"];
const protectedPages = ["/recurring", "/onetime"];

export default async function middleware(req: NextRequest) {
    // Require respective pages to have authentication
    const REQUEST_PATH = req.nextUrl.pathname;
    // Fetch session
    const SESSION = await auth();
    // Redirect to home/login page when not properly authenticated
    if (protectedPages.includes(REQUEST_PATH) && SESSION === null) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}