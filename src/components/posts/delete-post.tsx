"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type DeletePostProps = {
  postId: number;
};

export const DeletePost = ({ postId }: DeletePostProps) => {
  const utils = api.useUtils();
  const { mutate } = api.post.delete.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate();
      utils.post.latest.invalidate();
    },
  });
  const handleDeleteClick = () => {
    mutate({
      id: postId,
    });
  };

  return (
    <Button onClick={handleDeleteClick} className="flex gap-2" size="icon">
      <Trash className="h-3 w-3" />
    </Button>
  );
};
