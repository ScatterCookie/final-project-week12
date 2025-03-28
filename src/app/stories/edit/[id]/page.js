import { revalidatePath } from "next/cache";
import { db } from "@/app/utils/db";
import { redirect } from "next/navigation";

export default async function EditBio({ params }) {
  const { id } = await params;
  async function handleEdit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { story_title, story_cont } = data;

    await db.query(
      `UPDATE game_stories SET story_title = $1, story_cont = $2 WHERE id = $3`,
      [story_title, story_cont, id]
    );

    revalidatePath(`/games/${id}`);

    redirect(`/games/${id}`);
  }

  const res = await db.query(`SELECT * FROM game_stories WHERE id = $1`, [id]);
  const content = res.rows[0];

  return (
    <form
      action={handleEdit}
      className="rounded border-stone-500 border-2 bg-pink-300 w-1/2  flex flex-col h-1/2"
    >
      <label htmlFor="story_title" className="text-left m-6 mb-0">
        Edit Existing Title
      </label>
      <input
        id="story_title"
        name="story_title"
        placeholder="What do you call this?"
        defaultValue={content.story_title}
        className="pl-2 border-stone-500 border-2 ml-6 mr-6 mb-0"
      ></input>

      <label htmlFor="story_cont" className="text-left m-6 mb-0">
        Edit Story
      </label>
      <input
        id="story_cont"
        name="story_cont"
        placeholder="What's on your mind?"
        defaultValue={content.story_cont}
        className="pl-2 border-stone-500 border-2 ml-6 mr-6 mb-6"
      ></input>
      <button
        type="submit"
        className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1 pb-2"
      >
        Confirm Changes!
      </button>
    </form>
  );
}
