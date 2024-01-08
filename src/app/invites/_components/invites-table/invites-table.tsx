import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import {
  InvitesTable as InvitesTableClient,
  InvitesTableHeader,
} from "@/components/invites/invites-table";

type InvitesTableProps = {
  limit?: number;
};

export const InvitesTable = async ({ limit }: InvitesTableProps) => {
  const helpers = await createSSRHelpers();
  await helpers.group.all.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <InvitesTableClient>
        <InvitesTableHeader />
      </InvitesTableClient>
    </ReactQueryHydrate>
  );
};
