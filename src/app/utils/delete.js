'use server'
import { db } from "./db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function handleDeleteGame(id){

    await db.query(``, [id])
    revalidatePath(`/game/${id}`)
    redirect(`/game/${id}`)
}

export async function handleDeleteStory(id){
    await db.query(`DELETE FROM `, [id])
    revalidatePath(`/game`)
    redirect(`/game`)
}

export async function handleDeleteReview(id){
    await db.query(`DELETE FROM `, [id])
    revalidatePath(`/game`)
    redirect(`/game`)
}