import Image from "next/image";
import NavBar from "../components/NavBar";
import NewReview from "../components/NewReview";
import { db } from "../utils/db";

export default async function Page() {
  const games = await db.query("SELECT * FROM games");
  console.log(games);
  return (
    <div>
      {games.rows.map((game) => (
        <div key={game.id}>
          <h1>{game.game_title}</h1>
          <p>{game.game_info}</p>
          <Image
            src={game.game_img}
            alt="game poster"
            width={250}
            height={150}
          ></Image>
        </div>
      ))}
    </div>
  );
}
