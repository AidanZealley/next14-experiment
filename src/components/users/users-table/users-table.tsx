"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/react";
import { UserAvatar } from "@/components/user-avatar";
import { UserActionsMenu } from "@/components/users/user-actions-menu";
import { StatusOverlay } from "@/components/status-overlay";
import { Badge } from "@/components/ui/badge";

type UsersTableProps = {
  limit?: number;
  children: React.ReactNode;
};

export const UsersTable = ({ limit, children }: UsersTableProps) => {
  const {
    data: users,
    isLoading,
    isRefetching,
    isError,
    error,
  } = api.user.all.useQuery();

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      error={error}
    >
      <Table>
        {children}
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <UserAvatar
                  src={user.image}
                  name={user.name}
                  className="h-6 w-6"
                />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isAdmin ? <Badge>Admin</Badge> : <Badge>User</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <UserActionsMenu userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StatusOverlay>
  );
};
