import NavBar from "@/app/components/NavBar";
import NewReview from "@/app/components/NewReview";
import NewStory from "@/app/components/NewStory";
import { db } from "@/app/utils/db";
import Image from "next/image";
import EditButton from "@/app/components/Editgame";
import DeleteButton from "@/app/components/DeleteGame";

export default async function Page({ params }) {
  const id = await params;
  const reviews = await db.query(
    "SELECT * FROM game_review WHERE game_id = $1",
    [id.id]
  );
  const gameData = await db.query("SELECT * FROM games WHERE id = $1", [id.id]);
  const stories = await db.query(
    "SELECT * FROM game_stories WHERE game_id = $1",
    [id.id]
  );
  return (
    <div>
      <h1 className="text-3xl">{gameData.rows[0].game_name}!</h1>
      <Image
        src={gameData.rows[0].game_img}
        alt="Game Picture"
        width={250}
        height={150}
      ></Image>
      <p>{gameData.rows[0].game_info}</p>
      <EditButton id={gameData.rows[0].id} />
      <DeleteButton id={gameData.rows[0].id} />

      <NewReview id={id} />
      {reviews.rows.map((review) => (
        <div key={review.id}>
          <h1>{review.review_cont}</h1>
        </div>
      ))}
      <NewStory id={id} />
      {stories.rows.map((story) => (
        <div key={story.id}>
          <h1>{story.story_title}</h1>
          <p>{story.story_cont}</p>
        </div>
      ))}
    </div>
  );
}
