'use client'
import { handleDeleteGame } from "../utils/delete"

export default function DeleteButton({id}) {


    return (
        <button onClick={() => {
            handleDeleteGame(id)
        }}>Remove Game</button>
    )
}