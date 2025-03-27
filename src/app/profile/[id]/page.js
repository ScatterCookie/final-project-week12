import NotFound from "./not-found";
import { db } from "@/app/utils/db";
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({ params }) {
  const { id } = await params;
  const userInfo = await db.query(`SELECT * FROM user_info WHERE id = $1`, [
    id,
  ]);

  const data = await db.query(`SELECT * FROM game_review WHERE clerk_id = $1`, [userInfo.rows[0].clerk_id])
    const reviews = data.rows

  const story = await db.query(`SELECT * FROM game_stories WHERE clerk_id = $1`, [userInfo.rows[0].clerk_id])
  const stories = story.rows

  let user;

  try {
    const client = await clerkClient();
    user = await client.users.getUser(userInfo.rows[0].clerk_id);
  } catch (e) {
    console.log("Cannot fetch user from Clerk:", e);
    user = null;
  }

  if (userInfo.rowCount == 0) {
    notFound();
  }


  return (
    <>
      <div>
        <p>Welcome to {userInfo.rows[0].username}&apos;s page</p>
        <Image
          className="m-5 rounded-full shadow-black shadow-md"
          src={user.imageUrl}
          height={200}
          width={200}
          alt="Your profile picture"
        />
        <br />
        <p>{userInfo.rows[0].username}&apos;s Bio:</p>
        <p>{userInfo.rows[0].bio}</p>
        <p>User Posted Reviews</p>
        <p>{reviews.review_cont}</p>
        <h6>{reviews.time_posted === 0 ?
        <p>{new Date(reviews.time_posted).toLocaleString()}</p>: ""}</h6>
        <p>User Posted Stories</p>
        <p>{stories.story_title}</p>
        <p>{stories.story_cont}</p>
        {stories.time_posted === 0 ?
        <p>{new Date(stories.time_created).toLocaleString()}</p>: ""}
      </div>
    </>
  );
}
