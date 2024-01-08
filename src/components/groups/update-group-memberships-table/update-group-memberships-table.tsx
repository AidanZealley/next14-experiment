"use client";

import { Table, TableBody } from "@/components/ui/table";
import { api } from "@/trpc/react";
import { StatusOverlay } from "@/components/status-overlay";
import { UpdateGroupMembershipsTableRow } from "./update-group-memberships-table-row";

type InviteUsersTableProps = {
  groupId: string;
  limit?: number;
  children: React.ReactNode;
};

export const UpdateGroupMembershipsTable = ({
  groupId,
  limit,
  children,
}: InviteUsersTableProps) => {
  const {
    data: users,
    isLoading,
    isRefetching,
    isError,
    error,
  } = api.user.allWithMembershipsAndInvites.useQuery();

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
          {users?.map((user) => (
            <UpdateGroupMembershipsTableRow
              key={user.id}
              user={user}
              groupId={groupId}
            />
          ))}
        </TableBody>
      </Table>
    </StatusOverlay>
  );
};
