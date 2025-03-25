import Link from "next/link";
import navcssStyles from "../css/navcss.module.css";

export default function NavBar() {
  return (
    <nav>
      <div className="flex-col">
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/stories">Stories</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
}
