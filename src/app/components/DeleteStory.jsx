"use client";
import { handleDeleteStory } from "../utils/delete";
import profileStyles from "../css/profile.module.css";

export default function DeleteStoryButton({ id }) {
  return (
    <button
      className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1"
      onClick={() => {
        handleDeleteStory(id);
      }}
    >
      Remove Story
    </button>
  );
}
