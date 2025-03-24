'use server'
import { db } from "./db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function editGame(id){
    await db.query(`SELECT * FROM `)
    revalidatePath(`/game/edit/${id}`)
    redirect(`/game`)
}

export async function editStory(id){
    await db.query(`SELECT * FROM `)
    revalidatePath(`/game/edit/${id}`)
    redirect(`/game`)
}

export async function editReview(id){
    await db.query(`SELECT * FROM `)
    revalidatePath(`/game/edit/${id}`)
    redirect(`/game`)
}