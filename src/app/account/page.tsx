import { ProfileForm } from "./_components/profile-form";
import { Profile } from "./_components/profile";
import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { ProfileFallback } from "./_components/profile-fallback";
import { getServerAuthSession } from "@/server/auth";
import { NotSignedIn } from "@/components/not-signed-in";

export default async function AccountProfile() {
  const helpers = await createSSRHelpers();
  await helpers.user.signedInUser.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);
  const signedInUser = await getServerAuthSession();

  if (!signedInUser) {
    return <NotSignedIn />;
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-3 py-6">
        <h2 className="text-2xl font-extrabold">Account</h2>
        <p className="prose">Your account settings.</p>
      </div>
      <ReactQueryHydrate state={dehydratedState}>
        <Suspense fallback={<ProfileFallback />}>
          <Profile />
        </Suspense>
        <ProfileForm />
      </ReactQueryHydrate>
    </div>
  );
}
