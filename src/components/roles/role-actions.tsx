"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";

type RoleActionsProps = {
  roleId: number;
};

export const RoleActions = ({ roleId }: RoleActionsProps) => {
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
    <Dialog>
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
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <span className="flex items-center gap-2">
                <Pencil className="h-3 w-3" />
                <span>Update</span>
              </span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
          <DialogDescription>
            Make changes to the role and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        Stuff
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
