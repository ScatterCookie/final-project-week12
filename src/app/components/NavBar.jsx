import Link from "next/link";
import navCssStyles from "../css/navCss.module.css";

export default function NavBar() {
  return (
    <>
      <div className="flex gap-2">
        <Link className={navCssStyles.navButton} href="/">Home</Link>
        <Link className={navCssStyles.navButton} href="/games">Games</Link>
        <Link className={navCssStyles.navButton} href="/stories">Stories</Link>
        <Link className={navCssStyles.navButton} href="/profile">Profile</Link>
      </div>
    </>
  );
}
