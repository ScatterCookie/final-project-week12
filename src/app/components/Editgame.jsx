"use client";
import { editGame } from "../utils/edit";

export default function EditButton({ id }) {
  return (
    <button
      className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1"
      onClick={() => {
        editGame(id);
      }}
    >
      Edit Game
    </button>
  );
}
