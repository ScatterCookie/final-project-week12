"use client";
import { editStory } from "../utils/edit";

export default function EditStory({ id }) {
  return (
    <>
      <button
        className=""
        onClick={() => {
          editStory(id);
       }}
      >
        Edit Story
      </button>
    </>
  );
}
