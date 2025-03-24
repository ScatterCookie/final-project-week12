import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2 top-1 absolute left-1 p-2">
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/stories">Stories</Link>
        <Link href="/profile">Profile</Link>
      </ul>
    </nav>
  );
}
