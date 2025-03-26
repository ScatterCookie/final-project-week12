'use server'
import { db } from "./db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function handleDeleteGame(id){
    await db.query(`DELETE FROM games WHERE id = $1`, [id])
    revalidatePath(`/games/${id}`)
    redirect(`/games/`)
}

export async function handleDeleteStory(id){
    await db.query(`DELETE FROM game_stories WHERE clerk_id = $1`, [id])
    revalidatePath(`/profile`)
    redirect(`/profile`)
}

export async function handleDeleteReview(id){
    await db.query(`DELETE FROM game_review WHERE clerk_id = $1`, [id])
    revalidatePath(`/profile`)
    redirect(`/profile`)
}