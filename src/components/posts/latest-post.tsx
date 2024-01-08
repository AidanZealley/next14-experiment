"use client";

import formatRelative from "date-fns/formatRelative";
import { api } from "@/trpc/react";
import { Clock } from "lucide-react";
import { UserAvatar } from "../user-avatar";
import { StatusOverlay } from "../status-overlay";

export const LatestPost = () => {
  const {
    data: post,
    isLoading,
    isRefetching,
    isError,
    error,
  } = api.post.latest.useQuery();

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      errors={[error]}
    >
      <div className="grid min-h-[50vh] w-full place-items-center px-6 py-16">
        <div className="grid w-full max-w-5xl gap-6">
          <p className="text-7xl font-extrabold leading-tight">{post?.text}</p>

          <div className="grid gap-3">
            <div className="flex items-center gap-6">
              <UserAvatar
                src={post?.author?.image}
                name={post?.author?.name}
                className="h-12 w-12"
              />
              <div className="grid">
                <span className="text-lg">{post?.author?.name}</span>
                <span className="flex items-center gap-2 opacity-80">
                  <span className="text-sm">
                    Posted{" "}
                    {formatRelative(post?.createdAt ?? Date.now(), Date.now())}
                  </span>
                  <Clock className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatusOverlay>
  );
};
