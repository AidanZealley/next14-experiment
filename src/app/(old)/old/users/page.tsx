import { UsersTable, UsersTableFallback } from "./_components/users-table";
import { Suspense } from "react";
import { NotSignedIn } from "@/components/not-signed-in";
import { api } from "@/trpc/server";

export default async function Home() {
  const signedInUser = await api.user.signedInUser.query();

  if (!signedInUser) {
    return <NotSignedIn />;
  }

  return (
    <>
      <div className="grid gap-3 py-6">
        <h2 className="text-2xl font-extrabold">Users</h2>
        <p className="prose">All registered users.</p>
      </div>
      <Suspense fallback={<UsersTableFallback />}>
        <UsersTable />
      </Suspense>
    </>
  );
}
