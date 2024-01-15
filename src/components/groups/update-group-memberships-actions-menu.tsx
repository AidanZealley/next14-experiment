"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, UserMinus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { friendlyTRPCClientErrorCode } from "@/lib/utils";

type UpdateGroupMembershipsActionsMenuProps = {
  groupId: string;
  userId: string;
  isMember: boolean;
  isInvited: boolean;
  isOwner: boolean;
};

export const UpdateGroupMembershipsActionsMenu = ({
  groupId,
  userId,
  isMember,
  isInvited,
  isOwner,
}: UpdateGroupMembershipsActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const [confirmRemoveMemberOpen, setConfirmRemoveMemberOpen] = useState(false);
  const [confirmDeleteGroupInviteOpen, setConfirmDeleteGroupInviteOpen] =
    useState(false);
  const utils = api.useUtils();
  const { toast } = useToast();

  const { mutate: inviteUser } = api.invite.create.useMutation({
    onSuccess: () => {
      utils.user.allWithMembershipsAndInvites.invalidate();
    },
    onError: (error) => {
      toast({
        title: friendlyTRPCClientErrorCode(error, {
          UNAUTHORIZED: "Not Permitted",
          NOT_FOUND: "Invite Not Found",
          BAD_REQUEST: "Request Error",
        }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteGroupInvite } = api.group.deleteGroupInvite.useMutation(
    {
      onSuccess: () => {
        utils.user.allWithMembershipsAndInvites.invalidate();
        setConfirmDeleteGroupInviteOpen(false);
      },
      onError: (error) => {
        toast({
          title: friendlyTRPCClientErrorCode(error, {
            UNAUTHORIZED: "Not Permitted",
            NOT_FOUND: "Invite Not Found",
            BAD_REQUEST: "Request Error",
          }),
          description: error.message,
          variant: "destructive",
        });
      },
    },
  );

  const { mutate: deleteMembership } = api.member.deleteMembership.useMutation({
    onSuccess: () => {
      utils.user.allWithMembershipsAndInvites.invalidate();
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

  const handleInviteClick = () => {
    inviteUser({
      groupId,
      userId,
    });
  };

  const handleRemoveInviteClick = () => {
    setConfirmDeleteGroupInviteOpen(true);
  };

  const handleDeleteGroupInvite = () => {
    deleteGroupInvite({
      groupId,
      userId,
    });
  };

  const handleRemoveMemberClick = () => {
    setConfirmRemoveMemberOpen(true);
  };

  const handleRemoveMember = () => {
    deleteMembership({
      groupId,
      userId,
    });
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            disabled={!isInvited && isMember && isOwner}
          >
            <MoreVertical className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {!isMember && !isInvited && (
            <DropdownMenuItem onClick={handleInviteClick}>
              <span className="flex items-center gap-2">
                <UserPlus className="h-3 w-3" />
                <span>Invite</span>
              </span>
            </DropdownMenuItem>
          )}
          {isInvited && !isMember && (
            <DropdownMenuItem onClick={handleRemoveInviteClick}>
              <span className="flex items-center gap-2">
                <UserMinus className="h-3 w-3" />
                <span>Remove Invite</span>
              </span>
            </DropdownMenuItem>
          )}
          {isMember && !isOwner && (
            <DropdownMenuItem onClick={handleRemoveMemberClick}>
              <span className="flex items-center gap-2">
                <UserMinus className="h-3 w-3" />
                <span>Remove From Group</span>
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationDialog
        open={confirmDeleteGroupInviteOpen}
        onOpenChange={setConfirmDeleteGroupInviteOpen}
        callback={handleDeleteGroupInvite}
      />
      <ConfirmationDialog
        open={confirmRemoveMemberOpen}
        onOpenChange={setConfirmRemoveMemberOpen}
        callback={handleRemoveMember}
      />
    </>
  );
};
