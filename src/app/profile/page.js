import {auth, currentUser} from "@clerk/nextjs/server"
import { db } from "../utils/db";
import UserForm from "../components/UserForm";
import Image from "next/image"
import Link from "next/link";

export default async function Page() {

    const {userId, redirectToSignIn} = await auth()

    const user = await currentUser();

    if(!user) return redirectToSignIn();

    const userInfo = await db.query(`SELECT * FROM user_info WHERE clerk_id = $1`, [userId])
    
    const clerkId = userInfo.rows[0].clerk_id
    
    const data = await db.query(`SELECT * FROM game_review WHERE clerk_id = $1`, [clerkId])
    const reviews = data.rows

    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [reviews[0].game_id])

    console.log(reviews[0].game_id)


        
        if(userInfo.rowCount ==0){
            return(
                <div>
                    <UserForm />
                </div>
            )
        }

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
        console.log(reviews[0].game_id)
  return (
    <>
        <div>
            <p>Hello {userInfo.rows[0].username}, Welcome to your profile!</p>
            <br/>
            <Image className="m-5 rounded-full shadow-black shadow-md" src={user.externalAccounts[0].imageUrl} height={200} width={200} alt="Your profile picture"/>
            <p>What you told us about yourself: </p>
            <br/>
            {reviews.map(renderReview)}
            <p>{userInfo.rows[0].bio}</p>
        </div>
    </>
  );
}