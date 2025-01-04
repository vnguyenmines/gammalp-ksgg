import { auth } from "@/auth";

export default async function getUserSession() {
    const SESSION = await auth();
    if (SESSION == null) { throw new Error("User session unexpectedly null"); }
    return SESSION;
}