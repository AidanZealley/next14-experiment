import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { SiteWrap } from "@/components/site-wrap";
import { RolesTable } from "@/components/roles/roles-table";
import { CreateRole } from "@/components/roles/create-role";

export default async function RolesHome() {
  const helpers = await createSSRHelpers();
  await helpers.role.all.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <SiteWrap>
      <div className="grid gap-12">
        <CreateRole />
        <ReactQueryHydrate state={dehydratedState}>
          <RolesTable />
        </ReactQueryHydrate>
      </div>
    </SiteWrap>
  );
}
