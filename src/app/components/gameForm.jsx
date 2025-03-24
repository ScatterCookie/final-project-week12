import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";
import { db } from "../utils/db";

export default function NewgameForm() {
    async function handleNewGame(formData){
        'use server';

        const data = Object.fromEntries(formData);
    const { title, description, poster } = data;
        

        await db.query(`INSERT INTO games (gamename, gameinfo, gameimage) VALUES ($1, $2, $3)`, [
            title,
            description,
            poster
        ])

        revalidatePath(`/game`);
        redirect(`/game`);
    }
    return(
        <form action={handleNewGame}>
            <label htmlFor="title">Game Title</label>
            <input id="title" name="title" type="text" placeholder="Game Title" required/>

            <label htmlFor="gameinfo">Game Description</label>
            <input id="gameinfo" name="gameinfo" type="text" placeholder="Description of Game" required/>

            <label htmlFor="gameimage">Game Poster</label>
            <input id="gameimage" name="gameimage" type="text" placeholder="Game Image URL" required/>

            <button type="submit">Submit Game</button>
        </form>
    )
}