"use client"
import { useSession } from "next-auth/react"
import SignOutButton from "./signoutbutton";

export default function UserStatus() {
    const { data: session } = useSession();

    return (
        <>
            {(session && session.user) ? 
                <>
                    <div>Logged in as {session.user.name}</div>
                    <SignOutButton />
                </>
                :
                <div>Not currently logged in</div>
            }
        </>
    );
}