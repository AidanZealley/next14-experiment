import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";
import Link from "next/link";
import { api, createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "./providers/react-query-hydrate";

export const AuthMenu = async () => {
  const signedInUser = await api.user.signedInUser.query();

  const helpers = await createSSRHelpers();
  await helpers.user.signedInUser.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  if (!signedInUser) {
    return (
      <Button asChild variant="ghost">
        <Link href="/api/auth/signin">Sign In</Link>
      </Button>
    );
  }

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <UserMenu />
    </ReactQueryHydrate>
  );
};
