import Image from "next/image";
import { db } from "../utils/db";
import Link from "next/link";
import NewGameForm from "../components/NewGameForm";
import newGameFormStyles from "../css/newGameForm.module.css";



export default async function Page() {
  const games = await db.query("select * from games ORDER BY id");

  return (
    <div className={newGameFormStyles.wrapper}>
      <div className="flex flex-wrap">
        <NewGameForm />
        {games.rows.map((game) => (
          <div className={newGameFormStyles.container} key={game.id}>
            <h1 className={newGameFormStyles.gamename}>{game.game_name}</h1>
            <Image
              className={newGameFormStyles.img}
              src={game.game_img}
              alt="game poster"
              width={250}
              height={150}
            />
            <p className={newGameFormStyles.gameinfo}>
              {`${game.game_info.substring(0, 80)}...`}
            </p>
            <Link className={newGameFormStyles.link} href={`/games/${game.id}`}>
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
