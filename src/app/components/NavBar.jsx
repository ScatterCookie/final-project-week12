import Link from "next/link";
import navCssStyles from "../css/navCss.module.css";

export default function NavBar() {
  return (
    <>
      <div className="flex gap-2">
        <Link className={navCssStyles.navButton} href="/"><span className={navCssStyles.hideTextH}>Home</span></Link>
        <Link className={navCssStyles.navButton} href="/games"><span className={navCssStyles.hideTextG}>Games</span></Link>
        <Link className={navCssStyles.navButton} href="/stories"><span className={navCssStyles.hideTextS}>Stories</span></Link>
        <Link className={navCssStyles.navButton} href="/profile"><span className={navCssStyles.hideTextP}>Profile</span></Link>
      </div>
    </>
  );
}
