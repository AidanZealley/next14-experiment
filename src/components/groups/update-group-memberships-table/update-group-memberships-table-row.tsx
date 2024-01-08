import { TableCell, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/user-avatar";
import { Badge } from "@/components/ui/badge";
import { UpdateGroupMembershipsActionsMenu } from "../update-group-memberships-actions-menu";
import { RouterOutputs } from "@/trpc/shared";
import { ArrayElement } from "@/lib/types";

type UpdateGroupMembershipsTableRowProps = {
  user: ArrayElement<RouterOutputs["user"]["allWithMembershipsAndInvites"]>;
  groupId: string;
};

export const UpdateGroupMembershipsTableRow = ({
  user,
  groupId,
}: UpdateGroupMembershipsTableRowProps) => {
  const isOwner = user.memberships.filter(
    (membership) =>
      membership.group.userId === user.id && membership.group.id === groupId,
  );
  const isMember = user.memberships.filter(
    (membership) => membership.groupId === groupId,
  );
  const isInvited = user.invites.filter((invite) => invite.groupId === groupId);

  return (
    <TableRow>
      <TableCell>
        <UserAvatar src={user.image} name={user.name} className="h-6 w-6" />
      </TableCell>
      <TableCell className="font-medium">
        <span className="flex items-center gap-3">
          {user.name}
          {isOwner.length ? <Badge>Owner</Badge> : null}
        </span>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        {isMember.length ? <Badge>Member</Badge> : null}
        {isInvited.length ? <Badge>Invited</Badge> : null}
      </TableCell>
      <TableCell className="text-right">
        <UpdateGroupMembershipsActionsMenu userId={user.id} groupId={groupId} />
      </TableCell>
    </TableRow>
  );
};
