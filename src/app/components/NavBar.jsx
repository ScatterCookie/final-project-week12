import Link from "next/link"
import Style from "./games/games-page.module.css"

export default function NavBar() {
  return (
    <div className={Styles.userSection}>
      <h3>Hi, User </h3>
      <ul className={Styles.navList}>
        <li className={Styles.navItem}>Home</li>
        <li className={Styles.navItem}>Games</li>
        <li className={Styles.navItem}>Stories</li>
        <li className={Styles.navItem}>Profile</li>
      </ul>
      <input 
        type="text" 
        placeholder="Search..." 
        className={Styles.searchBar}
      />
    </div>
  );
}