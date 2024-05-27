import "@/styles/global.css";
import Link from "next/link";
const title = "QUANTUM GOMOKU";

function Navbar() {
  return (
    <div className="navbar">
      <Link href="/">
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

export default Navbar;
