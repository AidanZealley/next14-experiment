"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash, UserMinus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import { UpdateGroupDropdownItem } from "@/components/groups/update-group-dropdown-item";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { friendlyTRPCClientErrorCode } from "@/lib/utils";
import { UpdateGroupMembershipsDropdownItem } from "./update-group-memberships-dropdown-item";

type GroupActionsMenuProps = {
  groupId: string;
  isMember: boolean;
  isOwner: boolean;
};

export const GroupActionsMenu = ({
  groupId,
  isMember,
  isOwner,
}: GroupActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const utils = api.useUtils();
  const { toast } = useToast();

  const { mutate: joinGroup } = api.group.join.useMutation({
    onSuccess: () => {
      utils.group.all.invalidate();
      utils.group.byId.invalidate({
        id: groupId,
      });
    },
    onError: (error) => {
      toast({
        title: friendlyTRPCClientErrorCode(error, {
          NOT_FOUND: "Group Not Found",
          UNAUTHORIZED: "Not Permitted",
          CONFLICT: "Membership Exists",
        }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: leaveGroup } = api.group.leave.useMutation({
    onSuccess: () => {
      utils.group.all.invalidate();
      utils.group.byId.invalidate({
        id: groupId,
      });
    },
    onError: (error) => {
      toast({
        title: friendlyTRPCClientErrorCode(error, {
          NOT_FOUND: "Membership Not Found",
          BAD_REQUEST: "Request Error",
        }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteGroup } = api.group.delete.useMutation({
    onSuccess: () => {
      utils.group.all.invalidate();
    },
    onError: (error) => {
      toast({
        title: friendlyTRPCClientErrorCode(error, {
          BAD_REQUEST: "Request Error",
          NOT_FOUND: "Group Not Found",
          UNAUTHORIZED: "Not Permitted",
        }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleJoinClick = () => {
    joinGroup({
      groupId,
    });
  };

  const handleLeaveClick = () => {
    leaveGroup({
      groupId,
    });
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    deleteGroup({
      id: groupId,
    });
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <MoreVertical className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isMember && (
            <DropdownMenuItem onClick={handleJoinClick}>
              <span className="flex items-center gap-2">
                <UserPlus className="h-3 w-3" />
                <span>Join</span>
              </span>
            </DropdownMenuItem>
          )}
          {isMember && (
            <>
              <DropdownMenuItem onClick={handleLeaveClick}>
                <span className="flex items-center gap-2">
                  <UserMinus className="h-3 w-3" />
                  <span>Leave</span>
                </span>
              </DropdownMenuItem>
              <UpdateGroupMembershipsDropdownItem
                groupId={groupId}
                closeHandler={closeHandler}
              />
            </>
          )}
          {isOwner && (
            <>
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
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        callback={handleDelete}
      />
    </>
  );
};
