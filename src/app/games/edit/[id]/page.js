import { db } from "@/app/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editGame({ params }) {
  const { id } = await params;
  async function applyEdit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { game_name, game_info, game_img } = data;

    // await db.query(`UPDATE games SET game_title = $1 WHERE id =$2`, [title, id])
    // await db.query(`UPDATE games SET game_info = $1 WHERE id = $2`, [description, id])
    // await db.query(`UPDATE games SET game_img = $1 WHERE id = $2`, [poster, id])

    await db.query(
      `UPDATE games SET game_name = $1, game_info = $2, game_img = $3 WHERE id = $4`,
      [game_name, game_info, game_img, id]
    );

    revalidatePath(`/games/${id}`);

    redirect(`/games/${id}`);
  }

  const res = await db.query(`SELECT * FROM games WHERE id =$1`, [id]);
  const game = res.rows[0];
  console.log(game.game_info);

  return (
    <form
      action={applyEdit}
      className="rounded border-stone-500 border-2 bg-pink-300 w-1/2  flex flex-col h-1/2"
    >
      <label htmlFor="game_name" className="text-left m-6 mb-0">
        Game Title:
      </label>
      <input
        id="game_name"
        name="game_name"
        type="text"
        defaultValue={game.game_name}
        required
        className="pl-2 border-stone-500 border-2 ml-6 mr-6"
      />

      <label htmlFor="game_info" className="text-left m-6 mb-0">
        Description:
      </label>
      <input
        id="game_info"
        name="game_info"
        type="text"
        defaultValue={game.game_info}
        required
        className="pl-2 border-stone-500 border-2 ml-6 mr-6"
      />

      <label htmlFor="title" className="text-left m-6 mb-0">
        Poster:
      </label>
      <input
        id="game_img"
        name="game_img"
        defaultValue={game.game_img}
        required
        className="pl-2 border-stone-500 border-2 ml-6 mr-6 mb-6"
      />

      <button
        type="submit"
        className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1 pb-2"
      >
        Save Changes
      </button>
    </form>
  );
}
