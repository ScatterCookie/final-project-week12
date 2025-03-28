import { db } from "../utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function NewReview({ id }) {
  const clientUser = await currentUser();
  const clerk_id = clientUser.id;
  async function handleSubmit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { review_cont, game_id } = data;

    await db.query(
      `INSERT INTO game_review (review_cont, game_id, clerk_id) VALUES ($1 , $2, $3)`,
      [review_cont, game_id, clerk_id]
    );
    revalidatePath(`/games/${game_id}`);
  }

  return (
    <form
      className="rounded border-stone-500 border-2 bg-slate-400 w-1/2  flex flex-col"
      action={handleSubmit}
    >
      <p>Write a review:</p>
      <input
        className="p-2 rounded border-stone-500 border-2 m-1"
        id="review_cont"
        name="review_cont"
        placeholder="Review"
      />
      <input type="hidden" name="game_id" value={id.id} />
      <button
        className="border-2 rounded bg-stone-500 border-stone-500 p-2 text-slate-800 hover:bg-red-400 m-1"
        type="submit"
      >
        Post!
      </button>
    </form>
  );
}
