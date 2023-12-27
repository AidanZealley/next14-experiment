"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import { UpdateUserDropdownItem } from "@/components/users/update-user-dropdown-item";

type UserActionsMenuProps = {
  userId: string;
};

export const UserActionsMenu = ({ userId }: UserActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const { mutate } = api.user.delete.useMutation({
    onSuccess: () => {
      utils.user.all.invalidate();
    },
  });
  const handleDeleteClick = () => {
    mutate({
      id: userId,
    });
  };
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <MoreVertical className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <UpdateUserDropdownItem userId={userId} closeHandler={closeHandler} />
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
