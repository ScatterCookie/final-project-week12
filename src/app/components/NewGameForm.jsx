import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";
import { db } from "../utils/db";
import newGameFormStyles from "../css/newGameForm.module.css";

export default function NewGameForm() {
  async function handleNewGame(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { game_name, game_info, game_img } = data;

    await db.query(
      `INSERT INTO games (game_name, game_info, game_img) VALUES ($1, $2, $3)`,
      [game_name, game_info, game_img]
    );

    revalidatePath(`/games`);
  }
  return (
    <div className={newGameFormStyles.container}>
      <form action={handleNewGame} className="">
        <label className={newGameFormStyles.newgameinfo} htmlFor="game_name">
          Game Title:
        </label>
        <input
          id="game_name"
          name="game_name"
          type="text"
          placeholder="Game Title"
          required
          className="w-full pl-2 border-stone-500 border-2"
        />

        <label className={newGameFormStyles.newgameinfo} htmlFor="game_info">
          Game Description:
        </label>
        <input
          id="game_info"
          name="game_info"
          type="text"
          placeholder="Description of Game"
          required
          className="w-full pl-2 border-stone-500 border-2"
        />

        <label className={newGameFormStyles.newgameinfo} htmlFor="game_img">
          Game Poster:
        </label>
        <input
          id="game_img"
          name="game_img"
          type="text"
          placeholder="Game Image URL"
          required
          className="w-full pl-2 border-stone-500 border-2"
        />

        <button className={newGameFormStyles.subButton} type="submit">
          Submit Game
        </button>
      </form>
    </div>
  );
}
