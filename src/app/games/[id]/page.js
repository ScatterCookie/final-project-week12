import NavBar from "@/app/components/NavBar";
import NewReview from "@/app/components/NewReview";
import NewStory from "@/app/components/NewStory";
import { db } from "@/app/utils/db";
import Image from "next/image";
import EditButton from "@/app/components/Editgame";
import DeleteButton from "@/app/components/DeleteGame";
import Link from "next/link";

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
  const youtubeSearch = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${gameData.rows[0].game_name}&maxResults=10&type=video&key=AIzaSyABiSCRECheWyoruOwQs0AN81RKWe3-gsU`
  );
  const youtubeResponse = await youtubeSearch.json();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">{gameData.rows[0].game_name}!</h1>
      <div className="flex flex-col items-center bg-pink-300 border-stone-500 border-2 rounded w-1/2 mt-2 mb-2">
        <p>{gameData.rows[0].game_info}</p>
        <Image
          src={gameData.rows[0].game_img}
          alt="Game Picture"
          width={250}
          height={150}
        ></Image>
        <EditButton id={gameData.rows[0].id} />
        <DeleteButton id={gameData.rows[0].id} />
      </div>
      <div className="flex flex-col w-1/2 justify-center bg-pink-300 border-stone-500 border-2 rounded mt-2 mb-2 p-2">
        <h2>Top 10 Youtube results for {gameData.rows[0].game_name}:</h2>
        <div className="flex flex-wrap justify-center">
          {youtubeResponse.items.map((video) => (
            <div key={video.etag}>
              <Link
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              >
                <Image
                  src={video.snippet.thumbnails.default.url}
                  alt={`${video.snippet.title} thumbnail`}
                  width={120}
                  height={90}
                ></Image>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/2 justify-center items-center bg-pink-300 border-stone-500 border-2 rounded mt-2 mb-2 p-2 gap-2">
        <NewReview id={id} />
        <div className="rounded border-stone-500 border-2 bg-slate-400 w-full">
          <h2>All reviews:</h2>
          {reviews.rows.map((review) => (
            <div key={review.id}>
              <h1>- {review.review_cont} -</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/2 justify-center items-center bg-pink-300 border-stone-500 border-2 rounded mt-2 mb-2 p-2 gap-2">
        <NewStory id={id} />
        {stories.rows.map((story) => (
          <div
            key={story.id}
            className="rounded border-stone-500 border-2 bg-slate-400 w-full"
          >
            <h1>{story.story_title}</h1>
            <p>{story.story_cont}</p>
            <h6>{new Date(story.time_created).toLocaleString("en-GB")}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
