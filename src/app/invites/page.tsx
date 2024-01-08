import {
  InvitesTable,
  InvitesTableFallback,
} from "./_components/invites-table";
import { Suspense } from "react";
import { NotSignedIn } from "@/components/not-signed-in";
import { api } from "@/trpc/server";

export default async function InvitesHome() {
  const signedInUser = await api.user.signedInUser.query();

  if (!signedInUser) {
    return <NotSignedIn />;
  }

  return (
    <>
      <div className="grid gap-3 py-6">
        <h2 className="text-2xl font-extrabold">Invites</h2>
        <p className="prose">Invites to groups.</p>
      </div>
      <Suspense fallback={<InvitesTableFallback />}>
        <InvitesTable />
      </Suspense>
    </>
  );
}
