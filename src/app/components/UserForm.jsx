import { auth } from "@clerk/nextjs/server";
import { db } from "../utils/db";

export default async function UserForm() {
    const {userId} = await auth()

    async function handleSubmit(formData){
        'use server'
        const {username, bio} = Object.fromEntries(formData)

        db.query(`INSERT INTO user_info (username, bio, clerk_id) VALUES ($1, $2, $3)`, [username, bio, userId])
    }
    return(
        <form action={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input name="username" placeholder="Enter your desired Username"/>
            <label htmlFor="Bio">Bio</label>
            <input name="bio" placeholder="Tell us about yourself!"/>
            <button type="submit">Submit</button>
        </form>
    )
}