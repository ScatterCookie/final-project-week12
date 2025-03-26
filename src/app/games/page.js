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
    <div className="flex flex-col bigMargin gap-2 bg-blue-400 border-stone-500 border-2 rounded w-full text-slate-800 pt-2">
      <div className="flex gap-2">
        <NewGameForm />
        <div className="flex flex-col gap-1">
          {games.rows.map((game) => (
            <div
              key={game.id}
              className="flex flex-col p-2 bg-pink-300 border-stone-500 border-2 rounded ml-50 text-slate-800 items-center"
            >
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
      </div>
    </div>
  );
}
