import { GroupsTable, GroupsTableFallback } from "./_components/groups-table";
import { Suspense } from "react";
import { NotSignedIn } from "@/components/not-signed-in";
import { CreateGroup } from "@/components/groups/create-group";
import { api } from "@/trpc/server";

export default async function Home() {
  const signedInUser = await api.user.signedInUser.query();

  if (!signedInUser) {
    return <NotSignedIn />;
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_auto] items-center gap-6">
        <div className="grid gap-3 py-6">
          <h2 className="text-2xl font-extrabold">Groups</h2>
          <p className="prose">All groups.</p>
        </div>
        <CreateGroup />
      </div>
      <Suspense fallback={<GroupsTableFallback />}>
        <GroupsTable />
      </Suspense>
    </>
  );
}
