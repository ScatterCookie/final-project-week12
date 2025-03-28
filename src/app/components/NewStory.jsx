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
    <form
      className="rounded border-stone-500 border-2 bg-slate-400 w-1/2 flex flex-col"
      action={handleSubmit}
    >
      <p className="">Story Title:</p>
      <input
        className="p-2 rounded border-stone-500 border-2 m-1"
        id="story_title"
        name="story_title"
        placeholder="Title"
      />
      <p>Story Content:</p>
      <input
        className="p-2 rounded border-stone-500 border-2 m-1"
        id="story_cont"
        name="story_cont"
        placeholder="Tell us your story!"
      />
      <input type="hidden" name="game_id" value={id.id} />
      <button
        className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1 pb-2"
        type="submit"
      >
        Post!
      </button>
    </form>
  );
}
