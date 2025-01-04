import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1 className="font-bold">Food Request Form</h1>
      {(session != null && session.user != undefined) ?
        <>
          <div>Logged in as {session.user.name}</div>
          <form action={async () => {
            "use server";
            await signOut();
          }}>
              <button type="submit">Sign Out</button>
          </form>
          <div>
            <Link href={"/recurring"} className="block">Recurring Request</Link>
            <Link href={"/onetime"} className="block">One-Time Request</Link>
          </div>
        </>
        :
        <form action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}>
          <button type="submit">Sign In</button>
        </form>}
    </main>
  );
}
