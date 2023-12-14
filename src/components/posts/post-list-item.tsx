import formatRelative from "date-fns/formatRelative";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/utils";
import { Clock } from "lucide-react";
import { PostActions } from "./post-actions";
import { Post, User } from "@/server/db/schema";

export type PostData = {
  post: Post,
  user: User,
}

type PostProps = {
  data: PostData
}

export const PostListItem = ({ data }: PostProps) => {
  return (
    <div className="grid grid-cols-[theme(spacing.10)_1fr] gap-4">
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
  )
}