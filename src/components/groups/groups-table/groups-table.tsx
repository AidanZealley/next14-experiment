"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/react";
import { UserAvatar } from "@/components/user-avatar";
import { GroupActionsMenu } from "@/components/groups/group-actions-menu";
import { StatusOverlay } from "@/components/status-overlay";
import { Badge } from "@/components/ui/badge";

type GroupsTableProps = {
  limit?: number;
  children: React.ReactNode;
};

export const GroupsTable = ({ limit, children }: GroupsTableProps) => {
  const {
    data: signedInUser,
    isLoading: signedInUserLoading,
    isRefetching: signedInUserIsRefetching,
    isError: signedInUserIsError,
    error: signedInUserError,
  } = api.user.signedInUser.useQuery();

  const {
    data: groups,
    isLoading,
    isRefetching,
    isError,
    error,
  } = api.group.all.useQuery();

  return (
    <StatusOverlay
      isLoading={isLoading && signedInUserLoading}
      isRefetching={isRefetching && signedInUserIsRefetching}
      isError={isError || signedInUserIsError}
      errors={[error, signedInUserError]}
    >
      <Table>
        {children}
        <TableBody>
          {groups?.map((group) => (
            <TableRow key={group.id}>
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <UserAvatar
                    src={group.owner?.image}
                    name={group.owner?.name}
                    className="h-6 w-6"
                  />
                  <span>{group.owner?.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge>
                  {group.memberships.length} Member
                  {group.memberships.length > 1 ? "s" : ""}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <GroupActionsMenu
                  groupId={group.id}
                  isMember={
                    !!group.memberships.filter(
                      (membership) => membership.userId === signedInUser?.id,
                    ).length
                  }
                  isOwner={group.owner.id === signedInUser?.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StatusOverlay>
  );
};
