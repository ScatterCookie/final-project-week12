import { revalidatePath } from "next/cache";
import { db } from "@/app/utils/db";
import { redirect } from "next/navigation";

export default async function EditBio({ params }) {
  const { id } = await params;
  async function handleEdit(formData) {
    "use server";

    const data = Object.fromEntries(formData);
    const { bio } = data;

    await db.query(`UPDATE user_info SET bio = $1 WHERE id = $2`, [bio, id]);

    revalidatePath("/profile");

    redirect("/profile");
  }

  const res = await db.query(`SELECT * FROM user_info WHERE id = $1`, [id]);
  const bio = res.rows[0].bio;

  return (
    <form
      action={handleEdit}
      className="rounded border-stone-500 border-2 bg-pink-300 w-1/2  flex flex-col h-1/2"
    >
      <label htmlFor="bio" className="text-left m-6 mb-0">
        Edit Existing Bio
      </label>
      <input
        id="bio"
        className="pl-2 border-stone-500 border-2 ml-6 mr-6"
        name="bio"
        placeholder="What's on your mind?"
        defaultValue={bio}
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
