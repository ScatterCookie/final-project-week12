import {auth, currentUser} from "@clerk/nextjs/server"
import { db } from "../utils/db";
import UserForm from "../components/UserForm";
import Image from "next/image"
import Link from "next/link";

export default async function Page() {

    const {userId, redirectToSignIn} = await auth()
    const user = await currentUser();

    const userInfo = await db.query(`SELECT * FROM user_info WHERE clerk_id = $1`, [userId])
    const clerkId = userInfo.rows[0].clerk_id

    const data = await db.query(`SELECT * FROM game_review WHERE clerk_id = $1`, [clerkId])
    const reviews = data.rows

    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [reviews[0].game_id])
    const stories = await db.query(`SELECT * FROM game_stories WHERE clerk_id = $1`, [clerkId]);

    if(!userId) return redirectToSignIn()
        
        if(userInfo.rowCount ==0){
            return(
                <div>
                    <UserForm />
                </div>
            )
        }

        async function renderStory(stories) {
            const game = await db.query(`SELECT * FROM games WHERE id = $1`, [stories.game_id]);
            return (
              <div key={stories.id}>
                <h2>{stories.story_title}</h2>
                <p>{stories.story_cont}</p>
                <p>A&nbsp;
                    <Link href={`/games/${stories.game_id}`}>{game.rows[0].game_name}</Link>
                    &nbsp;Story
                </p>
                <br/>
              </div>
            );
          }
          console.log(stories.rows)
        async function renderReview(review) {
            const game = await db.query("SELECT * FROM games WHERE id = $1", [
              review.game_id,
            ]);
            return (
              <div key={review.id}>
                <p>
                  <Link href={`/games/${review.game_id}`}>{game.rows[0].game_name}</Link>
                </p>
                <h2>{review.review_cont}</h2>
              </div>
            );
          }
  return (
    <>
        <div>
            <p>Hello {userInfo.rows[0].username}, Welcome to your profile!</p>
            <br/>
            <Image className="m-5 rounded-full shadow-black shadow-md" src={user.externalAccounts[0].imageUrl} height={200} width={200} alt="Your profile picture"/>
            <p>What you told us about yourself: </p>
            <p>{userInfo.rows[0].bio}</p>
            <br/>
            <h1>Reviews from {userInfo.rows[0].username}: </h1>
            {reviews.map(renderReview)}
            <br/>
            <h1>Stories from {userInfo.rows[0].username}: </h1>
            {stories.rows.map(renderStory)}
        </div>
    </>
  );
}