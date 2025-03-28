'use client'
import { handleDeleteReview } from "../utils/delete"

export default function DeleteReviewButton({id}) {


    return (
        <>
            <button onClick={() => {
                handleDeleteReview(id)
            }}>Remove Review</button>
        </>
    )
}