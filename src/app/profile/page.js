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
      <div className={profileStyles.review_game_wrap}
        key={story.clerk_id}>
        <div className={profileStyles.review_game}>{story.story_title}</div>
        <div className={profileStyles.review_cont}>{story.story_cont}</div>
        <div className={profileStyles.review_del}>
          A&nbsp;
          <Link href={`/games/${story.game_id}`}>{game.rows[0].game_name}</Link>
          &nbsp;Story
        </div>
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
      <div className={profileStyles.review_game_wrap} key={review.id}>
        <div className={profileStyles.review_game}><Link href={`/games/${review.game_id}`}>
          {game.rows[0].game_name}
        </Link></div>
        <div className={profileStyles.review_cont}>{review.review_cont}</div>
        <div className={profileStyles.review_del}><DeleteReviewButton id={clerkId} /></div>
      </div>
    );
  }
  return (
    <>
      <div className=" w-full text-slate-800 flex flex-col items-center gap-2">
        <p className="text-3xl m-4">
          Hello {userInfo.rows[0].username}, Welcome to your profile!
        </p>
        <div className="bg-pink-300 border-stone-500 border-2 rounded w-1/2 flex ">
          <Image
            className="m-5 rounded-full shadow-black shadow-md"
            src={user.externalAccounts[0].imageUrl}
            height={200}
            width={200}
            alt="Your profile picture"
          />
          <div className="flex flex-col items-start bg-pink-300">
            <p>What you told us about yourself: </p>
            <p className="text-left">{userInfo.rows[0].bio}</p>
          </div>
          <div className="absolute">
            <EditBio id={userInfo.rows[0].id} />
          </div>
        </div>
        <div className={profileStyles.review_wrap_container}>         
          <div className={profileStyles.review_wrap}>
            <div className={profileStyles.review_text}>Reviews from {userInfo.rows[0].username}. </div>
            <div className={profileStyles.review_name}>{reviews.map(renderReview)}</div>
          </div>
          <div className={profileStyles.stories_wrap}>
            <div className={profileStyles.stories_text}>Stories from {userInfo.rows[0].username}. </div>
            <div className={profileStyles.stories_name}>{stories.rows.map(renderStory)}</div>
          </div>
        </div> 
      </div>
    </div>
  );
}
