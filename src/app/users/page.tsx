import { SiteWrap } from "@/components/site-wrap";
import { UsersTable, UsersTableFallback } from "./_components/users-table";
import { Suspense } from "react";
import { getServerAuthSession } from "@/server/auth";
import { NotSignedIn } from "@/components/not-signed-in";

export default async function Home() {
  const signedInUser = await getServerAuthSession();

  if (!signedInUser) {
    return <NotSignedIn />;
  }
  return (
    <SiteWrap>
      <div className="grid gap-3 py-6">
        <h2 className="text-2xl font-extrabold">Users</h2>
        <p className="prose">All registered users.</p>
      </div>
      <Suspense fallback={<UsersTableFallback />}>
        <UsersTable />
      </Suspense>
    </SiteWrap>
  );
}
