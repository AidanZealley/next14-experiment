"use client";

import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";

export const InvitesBadge = () => {
  const { data: invites } = api.invite.allForSignedInUser.useQuery();

  if (!invites?.length) {
    return null;
  }

  return (
    <Badge variant="destructive" className="self-start">
      {invites?.length}
    </Badge>
  );
};
