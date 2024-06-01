import Link from "next/link";
const title = "Quantum Gomoku";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link href="/">
        <h2>{title}</h2>
      </Link>
    </div>
  );
}
