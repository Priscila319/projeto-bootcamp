import Link from "next/link";

export default function Page() {
  return(
    <>
    <h1>Home</h1>
    <nav>
      <Link href={"/pessoas"}>Pessoas</Link>
      <Link href={"/conhecimentos"}>Conhecimentos</Link>
    </nav>
    </>
  )
}