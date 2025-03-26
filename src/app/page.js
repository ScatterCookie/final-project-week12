import Image from "next/image";
import NavBar from "./components/NavBar";
import { db } from "./utils/db";
import Link from "next/link";
import mainStyles from "./css/main.module.css";

// import { Rock_Salt } from '@next/font/google'

// const rockSalt = Rock_Salt({
//   weight: '400',
//   style: 'normal', // or 'italic'
//   subsets: ['latin'] // or other subsets you need
// })

export default async function Home() {
  const games = await db.query("SELECT * FROM games");
  return (
    <div>
      <p className="">Welcome To the Week 12 Project.</p>
      <div className="">
        <div className={mainStyles.container}>
          <div className={`${mainStyles.box} ${mainStyles.item1}`}>
            <Link href={`/games/${games.rows[games.rows.length - 1].id}`}>
              <Image
                src={games.rows[games.rows.length - 1].game_img}
                alt={games.rows[games.rows.length - 1].game_name}
                height={250}
                width={150}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item2}`}>
            <Link href={`/games/${games.rows[games.rows.length - 2].id}`}>
              <Image
                src={games.rows[games.rows.length - 2].game_img}
                alt={games.rows[games.rows.length - 2].game_name}
                height={250}
                width={150}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item3}`}>
            <Link href={`/games/${games.rows[games.rows.length - 3].id}`}>
              <Image
                src={games.rows[games.rows.length - 3].game_img}
                alt={games.rows[games.rows.length - 3].game_name}
                height={250}
                width={150}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item4}`}>
            <Link href={`/games/${games.rows[games.rows.length - 4].id}`}>
              <Image
                src={games.rows[games.rows.length - 4].game_img}
                alt={games.rows[games.rows.length - 4].game_name}
                height={250}
                width={150}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item5}`}>
            <Link href={`/games/${games.rows[games.rows.length - 5].id}`}>
              <Image
                src={games.rows[games.rows.length - 5].game_img}
                alt={games.rows[games.rows.length - 5].game_name}
                height={250}
                width={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
