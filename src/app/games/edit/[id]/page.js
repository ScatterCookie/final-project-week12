import { db } from "@/app/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editGame({params}) {
    const {id} = await params;
    async function applyEdit(formData){
        'use server';

        const data = Object.fromEntries(formData);
        const { title, description, poster } = data;

        // await db.query(`UPDATE games SET game_title = $1 WHERE id =$2`, [title, id])
        // await db.query(`UPDATE games SET game_info = $1 WHERE id = $2`, [description, id])
        // await db.query(`UPDATE games SET game_img = $1 WHERE id = $2`, [poster, id])

        await db.query(`UPDATE games SET game_title = $1, game_info = $2, game_img = $3 WHERE id = $4`, [title, description, poster, id])

        revalidatePath(`/games/${id}`)
        redirect(`/games/${id}`)
    }

    const res = await db.query(`SELECT * FROM games WHERE id =$1`, [id])
    const game = res.rows[0]

    return(
        <div>
            <form actio={applyEdit}>
                <label htmlFor="title">Game Title</label>
                <input id="title" name="title" type="text" defaultValue={game.title} required />

                <label htmlFor="game_info">Description</label>
                <input id="game_info" name="game_info" type="text" defaultValue={game.description} required />

                <label htmlFor="title">Poster</label>
                <input id="game_img" name="game_img" defaultValue={game.poster} required />
            </form>
        </div>
    )
}