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
    <form className="" action={handleSubmit}>
      <p>Review:</p>
      <input
        className="p-2"
        id="review_cont"
        name="review_cont"
        placeholder="Review"
      />
      <input type="hidden" name="game_id" value={id.id} />
      <button className="p-2" type="submit">
        Post!
      </button>
    </form>
  );
}
