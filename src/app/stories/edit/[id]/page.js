import { revalidatePath } from "next/cache";
import { db } from "@/app/utils/db";
import { redirect } from "next/navigation";

export default async function EditBio({params}) {
    const {id} = await params;
    async function handleEdit(formData) {
        'use server'

        const data = Object.fromEntries(formData)
        const {story_title, story_cont} = data

        await db.query(`UPDATE game_stories SET story_title = $1, story_cont = $2 WHERE id = $3`, [story_title, story_cont, id])

        revalidatePath(`/games/${id}`)

        redirect(`/games/${id}`)

        
    }

    const res = await db.query(`SELECT * FROM game_stories WHERE id = $1`, [id])
    const content = res.rows[0]

    
    return (
        <form action={handleEdit}>
            <label htmlFor="story_title">Edit Existing Title</label>
            <input id="story_title" name="story_title" placeholder="What do you call this?" defaultValue={content.story_title}></input>

            <label htmlFor="story_cont">Edit Story</label>
            <input id="story_cont" name="story_cont" placeholder="What's on your mind?" defaultValue={content.story_cont}></input>
            <button type="submit">Confirm Changes!</button>
        </form>
    )
}