import { revalidatePath } from "next/cache";
import { db } from "@/app/utils/db";
import { redirect } from "next/navigation";

export default async function EditBio({params}) {
    const {id} = await params;
    async function handleEdit(formData) {
        'use server'

        const data = Object.fromEntries(formData)
        const {bio} = data

        await db.query(`UPDATE user_info SET bio = $1 WHERE id = $2`, [bio, id])

        revalidatePath("/profile")

        redirect("/profile")

        
    }

    const res = await db.query(`SELECT * FROM user_info WHERE id = $1`, [id])
    const bio = res.rows[0].bio

    
    return (
        <form action={handleEdit}>
            <label htmlFor="bio">Edit Existing Bio</label>
            <br/>
            <input id="bio" name="bio" placeholder="What's on your mind?" defaultValue={bio}></input>
            <button type="submit">Confirm Changes!</button>
        </form>
    )
}