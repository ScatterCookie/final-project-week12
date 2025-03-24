import NavBar from "@/app/components/NavBar";
import NewReview from "@/app/components/NewReview";

export default async function Page({ params }) {
  const id = await params;
  return (
    <div>
      <NewReview id={id} />
    </div>
  );
}
