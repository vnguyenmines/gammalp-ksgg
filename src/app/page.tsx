import { signIn } from "@/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SignInButton from "./components/signinbutton";
import UserStatus from "./components/userstatus";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold font">Food Request Form</h1>
      <UserStatus /> 
      <SignInButton />
      
      <div>
        <div>
          <Link href={"/recurring"}>Recurring Request</Link>
        </div>
        <div>
          <Link href={"/onetime"}>One-Time Request</Link>
        </div>
      </div>
    </main>
  );
}
