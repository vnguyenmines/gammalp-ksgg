import { signIn } from "@/auth";

export default async function SignInButton() {
    return (
        <form action={async () => {
            "use server";
            await signIn("google");
        }}>
            <button type="submit">Sign In</button>
        </form>
    );
}