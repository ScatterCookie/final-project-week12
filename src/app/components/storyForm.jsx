import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";
import { db } from "../utils/db";

export default function StoryForm() {
    async function handleNewStory(formData){
        'use server';

        const data = Object.fromEntries(formData);
        const { title, content } = data

        await db.query(`INSERT INTO gamestories (story_title, story_content)  VALUES ($1, $2)`, [
            title,
            content
        ])

        revalidatePath(`/game`);
        redirect(`/game`);
    }
    return(
        <form action={handleNewStory}>
            <label htmlFor="title">Story Title</label>
            <input id="title" name="title" type="text" placeholder="Story Title" required/>

            <label htmlFor="content">Story Title</label>
            <input id="content" name="content" type="text" placeholder="Tell us your story...!" required/>

            <button type="submit">Submit Story</button>
        </form>
    )
}