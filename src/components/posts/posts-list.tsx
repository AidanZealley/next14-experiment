"use client";

import formatRelative from "date-fns/formatRelative";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Clock } from "lucide-react";
import { PostActions } from "./post-actions";

export const PostsList = () => {
  const { data: infinitePages, isLoading } = api.post.infinite.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  console.log(infinitePages?.pages[0]?.pagePosts[0]);

  if (!infinitePages) {
    return <p>No data.</p>;
  }

  return (
    <>
      {infinitePages.pages.map((page) => {
        <div className="grid gap-10">
          {page?.pagePosts.map((data) => (
            <div
              className="grid grid-cols-[theme(spacing.10)_1fr] gap-4"
              key={data.post.id}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={data.user.image ?? ""} />
                <AvatarFallback>
                  {initialsFromName(data.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <span>{data?.user.name}</span>
                    <span className="flex items-center gap-2 opacity-80">
                      <span className="text-sm">
                        Posted{" "}
                        {formatRelative(
                          data?.post.createdAt ?? Date.now(),
                          Date.now(),
                        )}
                      </span>
                      <Clock className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <PostActions postId={data.post.id} />
                  </div>
                </div>

                <p className="text-2xl font-extrabold">{data.post.text}</p>
              </div>
            </div>
          ))}
        </div>;
      })}
    </>
  );
};
