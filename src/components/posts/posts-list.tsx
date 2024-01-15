"use client";

import { api } from "@/trpc/react";
import { PostsListPage } from "./posts-list-page";
import { Button } from "@/components/ui/button";
import { StatusOverlay } from "@/components/status-overlay";
import { INFINITE_POSTS_LIMIT } from "@/app/constants";

export const PostsList = () => {
  const {
    data: infinitePages,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    isError,
    error,
    fetchNextPage,
  } = api.post.infinite.useInfiniteQuery(
    {
      limit: INFINITE_POSTS_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const handleLoadMoreClick = () => {
    fetchNextPage();
  };

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      errors={[error]}
      notFoundFallback={<PostsListFallback />}
    >
      <div className="grid gap-12">
        {infinitePages?.pages.map((page, index) => (
          <PostsListPage postsPage={page.postsPage} key={index} />
        ))}

        {hasNextPage && (
          <Button
            onClick={handleLoadMoreClick}
            disabled={!hasNextPage || isFetchingNextPage || isRefetching}
          >
            Load More
          </Button>
        )}
      </div>
    </StatusOverlay>
  );
};

const PostsListFallback = () => {
  return (
    <div className="grid w-full place-items-center px-6">
      <p className="text-xl font-extrabold opacity-30">No posts yet 😞</p>
    </div>
  );
};
