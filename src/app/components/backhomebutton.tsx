import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function BackHomeButton() {
    return <Link href={"/"} className={buttonVariants({ variant: "secondary" }) + ` mt-5 mb-2`}>👈 Back home</Link>;
}