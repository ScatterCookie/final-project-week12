import { db } from "../utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function NewStory({ id }) {
  const clientUser = await currentUser();
  const clerk_id = clientUser.id;
  async function handleSubmit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { story_title, game_id, story_cont } = data;

    await db.query(
      `INSERT INTO game_stories (story_title, game_id, story_cont, clerk_id) VALUES ($1 , $2, $3, $4)`,
      [story_title, game_id, story_cont, clerk_id]
    );
    revalidatePath(`/games/${game_id}`);
  }

  return (
    <form className="" action={handleSubmit}>
      <p>Story Title:</p>
      <input
        className="p-2"
        id="story_title"
        name="story_title"
        placeholder="Title"
      />
      <p>Story Content:</p>
      <input
        className="p-2"
        id="story_cont"
        name="story_cont"
        placeholder="Tell us your story!"
      />
      <input type="hidden" name="game_id" value={id.id} />
      <button className="p-2" type="submit">
        Post!
      </button>
    </form>
  );
}
