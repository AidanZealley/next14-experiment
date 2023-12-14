import { ProfileForm } from "./_components/profile-form";
import { Profile } from "./_components/profile";
import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";

export default async function AccountProfile() {
  const helpers = await createSSRHelpers();
  await helpers.user.signedInUser.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Profile />
      <ProfileForm />
    </ReactQueryHydrate>
  );
}
