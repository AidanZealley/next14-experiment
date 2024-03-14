import { CreatePost } from "@/components/posts/create-post";
import { LatestPost, LatestPostFallback } from "@/app/_components/latest-post";
import { Suspense } from "react";
import { PostsList, PostsListFallback } from "@/app/_components/posts-list";
import { NotSignedIn } from "@/components/not-signed-in";
import { api } from "@/trpc/server";
import { INFINITE_POSTS_LIMIT } from "@/app/constants";

export default async function Home() {
  const signedInUser = await api.user.signedInUser.query();

  if (!signedInUser) {
    return <NotSignedIn />;
  }

  return (
    <div className="grid">
      <div className="grid min-h-[25vh]">
        <Suspense fallback={<LatestPostFallback />}>
          <LatestPost />
        </Suspense>
      </div>

      <div className="grid min-h-[75vh]">
        <div className="flex justify-center px-6">
          <div className="w-full max-w-xl">
            <div className="py-16">
              <CreatePost />
            </div>

            <div className="pb-16">
              <Suspense
                fallback={<PostsListFallback limit={INFINITE_POSTS_LIMIT} />}
              >
                <PostsList limit={INFINITE_POSTS_LIMIT} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
