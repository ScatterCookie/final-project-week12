import Link from "next/link";
import { db } from "../utils/db";
import EditStory from "../components/EditStories";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const stories = await db.query("SELECT * FROM game_stories");

  await auth();
  const user = await currentUser();

  async function renderStory(story) {
    const game = await db.query("SELECT * FROM games WHERE id = $1", [
      story.game_id,
    ]);

    return (
      <div key={story.id} className="border-stone-500 border-2 rounded w-1/2">
        <p>
          This story is from:
          <Link href={`/games/${story.game_id}`} className="text-blue-600">
            {" "}
            {game.rows[0].game_name}
          </Link>
        </p>
        <h2>{story.story_title}</h2>
        <p>{story.story_cont}</p>
        <div className="">
          {story.clerk_id == user.id ? <EditStory id={`${story.id}`} /> : ""}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-300 border-stone-500 border-2 rounded w-full text-slate-800">
      <h1 className="text-3xl p-4">Stories Page</h1>
      <div className="flex flex-col items-center gap-2">
        {stories.rows.map(renderStory)}
      </div>
    </div>
  );
}
