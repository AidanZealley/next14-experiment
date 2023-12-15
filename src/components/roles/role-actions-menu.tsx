"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";

type RoleActionsMenuProps = {
  children: React.ReactNode;
  roleId: number;
};

export const RoleActionsMenu = ({ children, roleId }: RoleActionsMenuProps) => {
  const utils = api.useUtils();
  const { mutate } = api.role.delete.useMutation({
    onSuccess: () => {
      utils.role.all.invalidate();
    },
  });
  const handleDeleteClick = () => {
    mutate({
      id: roleId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <MoreVertical className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleDeleteClick}>
          <span className="flex items-center gap-2">
            <Trash className="h-3 w-3" />
            <span>Delete</span>
          </span>
        </DropdownMenuItem>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
