import { db } from "../utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function NewReview({ id }) {
  console.log(id);
  const clientUser = await currentUser();
  async function handleSubmit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { review_content, game_id } = data;

    await db.query(
      `INSERT INTO gamereview (review_content, game_id, user_id) VALUES ($1 , $2, $3)`,
      [review_content, game_id, clientUser]
    );
    revalidatePath(`/games/${game_id}`);
  }

  return (
    <form className="" action={handleSubmit}>
      <p>Review:</p>
      <input
        className="p-2"
        id="review_content"
        name="review_content"
        placeholder="Review"
      />
      <input type="hidden" name="game_id" value={id} />
      <button className="p-2" type="submit">
        Post!
      </button>
    </form>
  );
}
