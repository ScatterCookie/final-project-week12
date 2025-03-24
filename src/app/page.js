import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  console.log(process.env.DB_CONN);
  return (
    <div>
      <p>Welcome To the Week 12 Project.</p>
    </div>
  );
}
