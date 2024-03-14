import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { GroupSwitcher as GroupSwitcherClient } from "@/components/group-switcher";
import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";

export const GroupSwitcher = async () => {
  const helpers = await createSSRHelpers();
  await helpers.user.signedInUser.prefetch();
  await helpers.group.signedInUserGroups.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <GroupSwitcherClient />
    </ReactQueryHydrate>
  );
};
