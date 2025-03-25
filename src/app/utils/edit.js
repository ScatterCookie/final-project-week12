'use server'
import { db } from "./db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function editGame(id){
    await db.query(`SELECT * FROM games`)
    revalidatePath(`/games/edit/`)
    redirect(`/games/edit/${id}`)
}

export async function editStory(id){
    await db.query(`SELECT * FROM game_stories`)
    revalidatePath(`/games/edit/`)
    redirect(`/games/edit/${id}`)
}

export async function editReview(id){
    await db.query(`SELECT * FROM games`)
    revalidatePath(`/games/edit/`)
    redirect(`/games/edit/${id}`)
}

export async function editBio(id){
    await db.query(`SELECT * FROM user_info`)
    revalidatePath(`/profile/${id}`)
    redirect(`/profile/edit/${id}`)
}