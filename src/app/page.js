import Image from "next/image";
import NavBar from "./components/NavBar";
import { db } from "./utils/db";
import Link from "next/link";
import mainStyles from "./css/main.module.css";

export default async function Home() {
  const games = await db.query("SELECT * FROM games ORDER BY id");

  const stories = await db.query(`SELECT * FROM game_stories`);

  const reviews = await db.query(`SELECT * FROM game_review`);

  const users = await db.query(`SELECT * FROM user_info`);

  return (
    <div>
      <p className="text-6xl rounded border-stone-500 border-2 bg-pink-300">
        CritPixel
      </p>
      <div className="">
        <div className={mainStyles.container}>
          <div className={`${mainStyles.box} ${mainStyles.item1}`}>
            <Link href={`/games/${games.rows[games.rows.length - 1].id}`}>
              <Image
                src={games.rows[games.rows.length - 1].game_img}
                alt={games.rows[games.rows.length - 1].game_name}
                height={250}
                width={200}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item2}`}>
            <Link href={`/games/${games.rows[games.rows.length - 2].id}`}>
              <Image
                src={games.rows[games.rows.length - 2].game_img}
                alt={games.rows[games.rows.length - 2].game_name}
                height={250}
                width={200}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item3}`}>
            <Link href={`/games/${games.rows[games.rows.length - 3].id}`}>
              <Image
                src={games.rows[games.rows.length - 3].game_img}
                alt={games.rows[games.rows.length - 3].game_name}
                height={250}
                width={200}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item4}`}>
            <Link href={`/games/${games.rows[games.rows.length - 4].id}`}>
              <Image
                src={games.rows[games.rows.length - 4].game_img}
                alt={games.rows[games.rows.length - 4].game_name}
                height={250}
                width={200}
              />
            </Link>
          </div>
          <div className={`${mainStyles.box} ${mainStyles.item5}`}>
            <Link href={`/games/${games.rows[games.rows.length - 5].id}`}>
              <Image
                src={games.rows[games.rows.length - 5].game_img}
                alt={games.rows[games.rows.length - 5].game_name}
                height={250}
                width={200}
              />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h1 className={mainStyles.para}>Current Total Games Added:</h1>
        <p className={mainStyles.number}>{games.rowCount}</p>
        <h1 className={mainStyles.para}>Current Stories Written:</h1>
        <p className={mainStyles.number}>{stories.rowCount}</p>
        <h1 className={mainStyles.para}>Total Reviews Posted:</h1>
        <p className={mainStyles.number}>{reviews.rowCount}</p>
        <h1 className={mainStyles.para}>Current Contributors:</h1>
        <p className={mainStyles.number}>{users.rowCount}</p>
      </div>
    </div>
  );
}
