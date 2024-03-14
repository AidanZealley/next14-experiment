import { NotSignedIn } from "@/components/not-signed-in";
import { api } from "@/trpc/server";
import { TestSlider } from "./_components/test-slider";

export default async function Home() {
  const signedInUser = await api.user.signedInUser.query();

  if (!signedInUser) {
    return <NotSignedIn />;
  }

  return <div className="grid">Overview</div>;
}
