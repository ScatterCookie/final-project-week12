import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";
import { db } from "../utils/db";

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
    <form
      action={handleNewGame}
      className="flex flex-col items-start gap-1 bg-pink-300 border-stone-500 border-2 rounded h-80 p-2"
    >
      <h1 className="text-slate-800 text-2xl">New game!</h1>
      <label htmlFor="game_name" className="text-slate-800">
        Game Title:
      </label>
      <input
        id="game_name"
        name="game_name"
        type="text"
        placeholder="Game Title"
        required
        className="text-slate-800"
      />

      <label htmlFor="game_info" className="text-slate-800">
        Game Description:
      </label>
      <input
        id="game_info"
        name="game_info"
        type="text"
        placeholder="Description of Game"
        required
        className="text-slate-800"
      />

      <label htmlFor="game_img" className="text-slate-800">
        Game Poster:
      </label>
      <input
        id="game_img"
        name="game_img"
        type="text"
        placeholder="Game Image URL"
        required
        className="text-slate-800"
      />
      <div className="self-center mt-3">
        <button
          type="submit"
          className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400"
        >
          Submit Game
        </button>
      </div>
    </form>
  );
}
