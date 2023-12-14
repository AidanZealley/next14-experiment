"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, MoreVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";

type PostActionsProps = {
  postId: number;
};

export const PostActions = ({ postId }: PostActionsProps) => {
  const utils = api.useUtils();
  const { mutate } = api.post.delete.useMutation({
    onSuccess: () => {
      utils.post.latest.invalidate();
      utils.post.infinite.invalidate();
    },
  });
  const handleDeleteClick = () => {
    mutate({
      id: postId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleDeleteClick}>
          <span className="flex items-center gap-2">
            <Trash className="h-3 w-3" />
            <span>Delete</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
