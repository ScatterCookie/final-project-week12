import Link from "next/link";
import NavBar from "../components/NavBar";
import { db } from "../utils/db";

export default async function Page() {
  const stories = await db.query("SELECT * FROM game_stories");
  async function renderStory(story) {
    const game = await db.query("SELECT * FROM games WHERE id = $1", [
      story.game_id,
    ]);
    return (
      <div key={story.id}>
        <h2>{story.story_title}</h2>
        <p>{story.story_cont}</p>
        <p>
          This story is from:
          <Link href={`/games/${story.game_id}`}>
            {" "}
            {game.rows[0].game_name}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Stories Page</h1>
      {stories.rows.map(renderStory)}
    </div>
  );
}
