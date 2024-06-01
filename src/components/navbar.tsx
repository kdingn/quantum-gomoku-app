import "@/styles/global.css";
import Link from "next/link";
const title = "Quantum Gomoku";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link href="/">
        <h2>{title}</h2>
      </Link>
      <AccountBoxIcon className="avatar" />
    </div>
  );
}
