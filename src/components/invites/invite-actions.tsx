"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { friendlyTRPCClientErrorCode } from "@/lib/utils";

type InviteActionsMenuProps = {
  inviteId: string;
};

export const InviteActionsMenu = ({ inviteId }: InviteActionsMenuProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const utils = api.useUtils();
  const { toast } = useToast();

  const { mutate: acceptInvite } = api.invite.accept.useMutation({
    onSuccess: () => {
      utils.invite.allForSignedInUser.invalidate();
    },
    onError: (error) => {
      toast({
        title: friendlyTRPCClientErrorCode(error, {
          NOT_FOUND: "Invite Not Found",
          UNAUTHORIZED: "Not Permitted",
          CONFLICT: "Membership Exists",
        }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: declineInvite } = api.invite.reject.useMutation({
    onSuccess: () => {
      utils.invite.allForSignedInUser.invalidate();
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

  const handleAcceptClick = () => {
    acceptInvite({
      id: inviteId,
    });
  };

  const handleDeclineClick = () => {
    setConfirmOpen(true);
  };

  const handleDecline = () => {
    declineInvite({
      id: inviteId,
    });
  };

  return (
    <div className="flex justify-end gap-3">
      <Button onClick={handleAcceptClick}>
        <span className="flex items-center gap-2">
          <Check className="h-3 w-3" />
          <span>Accept</span>
        </span>
      </Button>
      <Button variant="destructive" onClick={handleDeclineClick}>
        <span className="flex items-center gap-2">
          <X className="h-3 w-3" />
          <span>Decline</span>
        </span>
      </Button>
      <ConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        callback={handleDecline}
      />
    </div>
  );
};
