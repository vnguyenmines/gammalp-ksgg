import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1 className="font-bold">Food Request Form</h1>
      {(session != null && session.user != undefined) ?
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span>Logged in as {session.user.name}</span>
            <form className="mb-4" action={async () => {
              "use server";
              await signOut();
            }}>
                <button type="submit" className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-0 text-sm">Sign Out</button>
            </form>
          </div>
          <div>
            <Link href={"/recurring"} className="block">Recurring Request</Link>
            <Link href={"/onetime"} className="block">One-Time Request</Link>
          </div>
        </div>
        :
        <form action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}>
          <button type="submit" className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-0">Sign In</button>
        </form>}
    </main>
  );
}
