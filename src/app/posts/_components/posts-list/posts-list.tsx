import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { PostsList as PostsListClient } from "@/components/posts/posts-list";

type PostsListProps = {
  limit: number;
};

export const PostsList = async ({ limit }: PostsListProps) => {
  const helpers = await createSSRHelpers();
  await helpers.post.infinite.prefetchInfinite({
    limit,
  });
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <PostsListClient />
    </ReactQueryHydrate>
  );
};
