import { api, createSSRHelpers } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { PostsList } from "@/components/posts/posts-list";
import { LatestPost } from "@/components/posts/latest-post";
import { CreatePost } from "@/components/posts/create-post";

export default async function Posts() {
  const helpers = await createSSRHelpers();
  await helpers.post.latest.prefetch();
  await helpers.post.infinite.prefetchInfinite({
    limit: 2,
  });
  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className="grid gap-12 pb-16">
        <div className="grid min-h-[60vh] w-full place-items-center px-6 py-16">
          <div className="grid w-full max-w-5xl gap-6">
            <LatestPost />
          </div>
        </div>

        <div className="flex justify-center px-6">
          <div className="grid w-full max-w-xl gap-12">
            <CreatePost />
            <PostsList />
          </div>
        </div>
      </div>
    </ReactQueryHydrate>
  );
}
