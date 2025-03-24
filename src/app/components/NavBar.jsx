import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <>
          <Link href="/">Home</Link>
          <Link href="/games">Games</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/profile">Profile</Link>
      </>
    </nav>
  );
}
