import NotFound from "./not-found";
import { db } from "@/app/utils/db";
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;
  const userInfo = await db.query(`SELECT * FROM user_info WHERE id = $1`, [
    id,
  ]);

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
      </div>
    </>
  );
}
