'use client'
import { editGame } from "../utils/edit";

export default function EditButton({id}) {
    return(
            <button onClick={() => {
                        editGame(id);
                    }}>Edit Game</button>
    )
}