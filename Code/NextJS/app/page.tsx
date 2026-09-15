import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "4rem auto", textAlign: "center" }}>
      <h1>AAMEC Billing — Next.js</h1>
      <p>
        <Link href="/billing">Go to the billing counter →</Link>
      </p>
    </main>
  );
}
