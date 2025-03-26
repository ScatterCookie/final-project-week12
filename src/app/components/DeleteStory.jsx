'use client'
import { handleDeleteStory } from "../utils/delete"

export default function DeleteStoryButton({id}) {


    return (
        <button onClick={() => {
            handleDeleteStory(id)
        }}>Remove Story</button>
    )
}