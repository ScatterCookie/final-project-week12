import { auth } from "@clerk/nextjs/server";
import { db } from "../utils/db";

export default async function UserForm() {
  const { userId } = await auth();
  const date = new Date();

  async function handleSubmit(formData) {
    "use server";
    const { username, bio, created_at } = Object.fromEntries(formData);

    db.query(
      `INSERT INTO user_info (username, bio, clerk_id, created_at) VALUES ($1, $2, $3, $4)`,
      [username, bio, userId, created_at]
    );
  }
  return (
    <form action={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input name="username" placeholder="Enter your desired Username" />
      <label htmlFor="Bio">Bio</label>
      <input name="bio" placeholder="Tell us about yourself!" />
      <input
        name="created_at"
        type="hidden"
        value={new Date(date).toLocaleDateString("fr-CA", "full")}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
