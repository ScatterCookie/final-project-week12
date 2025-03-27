import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "../utils/db";
import UserForm from "../components/UserForm";
import Image from "next/image";
import Link from "next/link";
import EditBio from "../components/EditBio";
import DeleteReviewButton from "../components/DeleteReview";
import DeleteStoryButton from "../components/DeleteStory";
import profileStyles from "../css/profile.module.css";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();
  const user = await currentUser();

  if (!user) return redirectToSignIn();

  const userInfo = await db.query(
    `SELECT * FROM user_info WHERE clerk_id = $1`,
    [userId]
  );
  if (userInfo.rows.clerk_id === null) {
    return (
      <div>
        <UserForm />
      </div>
    );
  }
  const clerkId = userInfo.rows[0].clerk_id;

  const data = await db.query(`SELECT * FROM game_review WHERE clerk_id = $1`, [
    clerkId,
  ]);
  const reviews = data.rows;

  const stories = await db.query(
    `SELECT * FROM game_stories WHERE clerk_id = $1`,
    [clerkId]
  );

  if (!clerkId) {
    return (
      <div>
        <UserForm />
      </div>
    );
  }

  async function renderStory(story) {
    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [
      story.game_id,
    ]);
    return (
      <div className={profileStyles.container}
        key={story.clerk_id}
        
      >
        <h2 className={profileStyles.title}>{story.story_title}</h2>
        <p className={profileStyles.para}>{story.story_cont}</p>
        <p className={profileStyles.para}>
          A&nbsp;
          <Link href={`/games/${story.game_id}`}>{game.rows[0].game_name}</Link>
          &nbsp;Story
        </p>
        <DeleteStoryButton id={clerkId} />
        <br />
      </div>
    );
  }

  async function renderReview(review) {
    const game = await db.query("SELECT * FROM games WHERE id = $1", [
      review.game_id,
    ]);
    return (
      <div className={profileStyles.wrapperreview} key={review.id}>
        <div className={profileStyles.title}>
          <Link href={`/games/${review.game_id}`}>
            {game.rows[0].game_name}
          </Link>
        </div>
        <h2 className={profileStyles.para}>{review.review_cont}</h2>
        <DeleteReviewButton id={clerkId} />
      </div>
    );
  }
  return (
    <>
    <div>
      <div className={profileStyles.wrappereditbio}>
        <div className={profileStyles.para}>
          <p className={profileStyles.circle}><EditBio id={userInfo.rows[0].id} /></p>
        </div> 
        <div className={profileStyles.wrapper}>   
          <p className={profileStyles.title}>
          Hello {userInfo.rows[0].username},</p>
          <p className={profileStyles.para}> Welcome to your profile!</p>
        </div> 
      </div>
      <div className={profileStyles.wrapper}>
        <Image
            className={profileStyles.para}
            src={user.externalAccounts[0].imageUrl}
            height={200}
            width={200}
            alt="Your profile picture"
          />
        <div className={profileStyles.wrapperBio}>
          <p className={profileStyles.title}>What you told us about yourself: </p>
          <p className={profileStyles.para}>{userInfo.rows[0].bio}</p>
        </div>
      </div>
    </div>            
    <div className={profileStyles.wrapperreview}>
      <h1 className={profileStyles.title}>Reviews from {userInfo.rows[0].username}: </h1>
      <p className={profileStyles.para}>{reviews.map(renderReview)}</p>
    </div>
    <div className={profileStyles.wrapperstories}>
      <h1 className={profileStyles.para}>Stories from {userInfo.rows[0].username}: </h1>
      <p className={profileStyles.para}>{stories.rows.map(renderStory)}</p>
    </div>
     
    </>
  );
}
