"use client";
import { handleDeleteGame } from "../utils/delete";

export default function DeleteButton({ id }) {
  return (
    <button
      className="border-2 rounded bg-stone-500 border-stone-500 p-1 text-slate-800 hover:bg-red-400 m-1"
      onClick={() => {
        handleDeleteGame(id);
      }}
    >
      Remove Game
    </button>
  );
}
