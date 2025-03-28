"use client";
import { editBio } from "../utils/edit";

export default function EditBio({ id }) {
  return (
    <button
      className="text-slate-800 border-2 rounded bg-stone-500 border-stone-500 hover:bg-red-400 m-1 text-center"
      onClick={() => {
        editBio(id);
      }}
    >
      Edit
    </button>
  );
}
