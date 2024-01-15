import { CreatePost } from "@/components/posts/create-post";
import { LatestPost, LatestPostFallback } from "../_components/latest-post";
import { Suspense } from "react";
import { PostsList, PostsListFallback } from "../_components/posts-list";
import { NotSignedIn } from "@/components/not-signed-in";
import { api } from "@/trpc/server";
import { INFINITE_POSTS_LIMIT } from "../../constants";

export default async function Home() {
  const signedInUser = await api.user.signedInUser.query();

  if (!signedInUser) {
    return <NotSignedIn />;
  }

  return (
    <div className="grid gap-12 pb-16">
      <Suspense fallback={<LatestPostFallback />}>
        <LatestPost />
      </Suspense>

      <div className="flex justify-center px-6">
        <div className="grid w-full max-w-xl gap-12">
          <CreatePost />

          <Suspense
            fallback={<PostsListFallback limit={INFINITE_POSTS_LIMIT} />}
          >
            <PostsList limit={INFINITE_POSTS_LIMIT} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
