'use client'
import { handleDeleteStory } from "../utils/delete"
import profileStyles from "../css/profile.module.css";

export default function DeleteStoryButton({id}) {


    return (
        <>
            <button className={profileStyles.remove} onClick={() => {
                handleDeleteStory(id)
            }}>Remove Story</button>
        </>
    )
}