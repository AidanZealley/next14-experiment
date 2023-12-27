import { ReactQueryHydrate } from "@/components/providers/react-query-hydrate";
import { CreatePost } from "@/components/posts/create-post";
import { LatestPost, LatestPostFallback } from "./_components/latest-post";
import { Suspense } from "react";
import { PostsList, PostsListFallback } from "./_components/posts-list";

const LIMIT = 2;

export default async function Posts() {
  return (
    <div className="grid gap-12 pb-16">
      <Suspense fallback={<LatestPostFallback />}>
        <LatestPost />
      </Suspense>

      <div className="flex justify-center px-6">
        <div className="grid w-full max-w-xl gap-12">
          <CreatePost />

          <Suspense fallback={<PostsListFallback limit={LIMIT} />}>
            <PostsList limit={LIMIT} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
