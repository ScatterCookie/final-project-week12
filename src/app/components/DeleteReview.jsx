"use client";
import { handleDeleteReview } from "../utils/delete";

export default function DeleteReviewButton({ id }) {
  return (
    <button
      className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1"
      onClick={() => {
        handleDeleteReview(id);
      }}
    >
      Remove Review
    </button>
  );
}
