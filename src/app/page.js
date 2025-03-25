import Image from "next/image";
import NavBar from "./components/NavBar";
import { db } from "./utils/db";
import Link from "next/link";

export default async function Home() {
  const games = await db.query("SELECT * FROM games");
  return (
    <div>
      <p>Welcome To the Week 12 Project.</p>
      <div className="flex">
        <div>
          <Link href={`/games/${games.rows[games.rows.length - 1].id}`}>
            <Image
              src={games.rows[games.rows.length - 1].game_img}
              alt={games.rows[games.rows.length - 1].game_name}
              height={250}
              width={150}
            />
          </Link>
        </div>
        <div>
          <Link href={`/games/${games.rows[games.rows.length - 2].id}`}>
            <Image
              src={games.rows[games.rows.length - 2].game_img}
              alt={games.rows[games.rows.length - 2].game_name}
              height={250}
              width={150}
            />
          </Link>
        </div>
        <div>
          <Link href={`/games/${games.rows[games.rows.length - 3].id}`}>
            <Image
              src={games.rows[games.rows.length - 3].game_img}
              alt={games.rows[games.rows.length - 3].game_name}
              height={250}
              width={150}
            />
          </Link>
        </div>
        <div>
          <Link href={`/games/${games.rows[games.rows.length - 4].id}`}>
            <Image
              src={games.rows[games.rows.length - 4].game_img}
              alt={games.rows[games.rows.length - 4].game_name}
              height={250}
              width={150}
            />
          </Link>
        </div>
        <div>
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
  );
}
