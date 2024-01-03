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
import { UpdateGroupDropdownItem } from "@/components/groups/update-group-dropdown-item";

type GroupActionsMenuProps = {
  groupId: string;
};

export const GroupActionsMenu = ({ groupId }: GroupActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const { mutate } = api.group.delete.useMutation({
    onSuccess: () => {
      utils.group.all.invalidate();
    },
  });
  const handleDeleteClick = () => {
    mutate({
      id: groupId,
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
        <UpdateGroupDropdownItem
          groupId={groupId}
          closeHandler={closeHandler}
        />
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
