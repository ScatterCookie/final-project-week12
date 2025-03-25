import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Requested Profile Doesn&apos;t Exist!!</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
