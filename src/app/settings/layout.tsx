import { SettingsNav } from "./_components/settings-nav";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { api, createSSRHelpers } from "@/trpc/server";
import { NotSignedIn } from "@/components/not-signed-in";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const signedInUser = await api.user.signedInUser.query();

  if (!signedInUser || !signedInUser.userConfig?.groupId) {
    return <NotSignedIn />;
  }

  const helpers = await createSSRHelpers();

  await helpers.user.signedInUser.prefetch();
  await helpers.group.byId.prefetch({
    id: signedInUser.userConfig?.groupId,
  });

  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <div className="p-6">
      <div className="grid gap-12">
        <div className="grid gap-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <SettingsNav />
          <ReactQueryHydrate state={dehydratedState}>
            {children}
          </ReactQueryHydrate>
        </div>
      </div>
    </div>
  );
}
