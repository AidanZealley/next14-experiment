"use client";

import { api } from "@/trpc/react";
import { PostsListPage } from "./posts-list-page";
import { Button } from "@/components/ui/button";
import { StatusOverlay } from "@/components/status-overlay";

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
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const handleLoadMoreClick = () => {
    fetchNextPage();
  };

  if (!infinitePages) {
    return <p>No data.</p>;
  }

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      errors={[error]}
    >
      <div className="grid gap-12">
        {infinitePages.pages.map((page, index) => (
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
