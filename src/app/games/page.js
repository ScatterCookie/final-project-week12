import Image from "next/image";
import NavBar from "../components/NavBar";
import NewReview from "../components/NewReview";
import { db } from "../utils/db";
import Link from "next/link";
import NewGameForm from "../components/NewGameForm";

export default async function Page() {
  const games = await db.query("SELECT * FROM games");
  console.log(games);
  return (
    <div className="flex bigMargin">
      <NewGameForm />
      {games.rows.map((game) => (
        <div key={game.id} className="m-2 p-2 border-2 ml-50">
          <h1 className="text-3xl">{game.game_name}</h1>
          <p>{game.game_info}</p>
          <Image
            src={game.game_img}
            alt="game poster"
            width={250}
            height={150}
          ></Image>
          <Link href={`/games/${game.id}`} className="text-blue-500">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}
