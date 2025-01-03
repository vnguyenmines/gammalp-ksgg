import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Food Request Form</h1>
      <Link href={"/recurring"}>Recurring Request</Link>
      <Link href={"/onetime"}>One-Time Request</Link>
    </main>
  );
}
