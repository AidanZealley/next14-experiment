"use client";

import { api } from "@/trpc/react";
import { PostsListPage } from "./posts-list-page";
import { Button } from "@/components/ui/button";

export const PostsList = () => {
  const {
    data: infinitePages,
    hasNextPage,
    isFetchingNextPage,
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
    <>
      {infinitePages.pages.map((page, index) => (
        <PostsListPage postsPage={page.postsPage} key={index} />
      ))}

      <Button
        onClick={handleLoadMoreClick}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </Button>
    </>
  );
};
