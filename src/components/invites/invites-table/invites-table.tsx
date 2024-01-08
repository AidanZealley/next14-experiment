"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/react";
import { UserAvatar } from "@/components/user-avatar";
import { InviteActionsMenu } from "@/components/invites/invite-actions";
import { StatusOverlay } from "@/components/status-overlay";
import { formatRelative } from "date-fns";

type InvitesTableProps = {
  limit?: number;
  children: React.ReactNode;
};

export const InvitesTable = ({ limit, children }: InvitesTableProps) => {
  const {
    data: invites,
    isLoading,
    isRefetching,
    isError,
    error,
  } = api.invite.allForSignedInUser.useQuery();

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      errors={[error]}
    >
      <Table>
        {children}
        <TableBody>
          {invites?.map((invite) => (
            <TableRow key={invite.id}>
              <TableCell className="font-medium">{invite.group.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <UserAvatar
                    src={invite.invitedBy?.image}
                    name={invite.invitedBy?.name}
                    className="h-6 w-6"
                  />
                  <span>{invite.invitedBy?.name}</span>
                </div>
              </TableCell>
              <TableCell>
                {formatRelative(invite.createdAt ?? Date.now(), Date.now())}
              </TableCell>
              <TableCell className="text-right">
                <InviteActionsMenu inviteId={invite.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StatusOverlay>
  );
};
