import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import {
  UsersTable as UsersTableClient,
  UsersTableHeader,
} from "@/components/users/users-table";

type UsersTableProps = {
  limit?: number;
};

export const UsersTable = async ({ limit }: UsersTableProps) => {
  const helpers = await createSSRHelpers();
  await helpers.user.all.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <UsersTableClient>
        <UsersTableHeader />
      </UsersTableClient>
    </ReactQueryHydrate>
  );
};
