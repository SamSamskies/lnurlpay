import Link from "next/link";

export default function Header() {
  return (
    <h1>
      <Link href="/" className="title-link">
        LNURL Pay ⚡️
      </Link>
    </h1>
  );
}
