"use client";
import { editStory } from "../utils/edit";

export default function EditStory({ id }) {
  return (
    <button
      className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1"
      onClick={() => {
        editStory(id);
      }}
    >
      Edit Story
    </button>
  );
}
