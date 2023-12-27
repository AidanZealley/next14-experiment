import { CreatePost } from "@/components/posts/create-post";
import { LatestPost, LatestPostFallback } from "./_components/latest-post";
import { Suspense } from "react";
import { PostsList, PostsListFallback } from "./_components/posts-list";
import { getServerAuthSession } from "@/server/auth";
import { SiteWrap } from "@/components/site-wrap";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotSignedIn } from "@/components/not-signed-in";

const LIMIT = 2;

export default async function Home() {
  const signedInUser = await getServerAuthSession();

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

          <Suspense fallback={<PostsListFallback limit={LIMIT} />}>
            <PostsList limit={LIMIT} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
