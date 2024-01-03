import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import {
  GroupsTable as GroupsTableClient,
  GroupsTableHeader,
} from "@/components/groups/groups-table";

type GroupsTableProps = {
  limit?: number;
};

export const GroupsTable = async ({ limit }: GroupsTableProps) => {
  const helpers = await createSSRHelpers();
  await helpers.group.all.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <GroupsTableClient>
        <GroupsTableHeader />
      </GroupsTableClient>
    </ReactQueryHydrate>
  );
};
