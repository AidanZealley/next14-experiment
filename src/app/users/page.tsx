import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { UsersTable } from "@/components/users/users-table";
import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { SiteWrap } from "@/components/site-wrap";

export default async function Home() {
  const helpers = await createSSRHelpers();
  await helpers.user.all.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <SiteWrap>
      <ReactQueryHydrate state={dehydratedState}>
        <UsersTable />
      </ReactQueryHydrate>
    </SiteWrap>
  );
}
