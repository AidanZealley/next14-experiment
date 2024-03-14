import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { LatestPost as LatestPostClient } from "@/components/posts/latest-post";

export const LatestPost = async () => {
  const helpers = await createSSRHelpers();
  await helpers.post.latest.prefetch();
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <LatestPostClient />
    </ReactQueryHydrate>
  );
};
