"use client";

import { StatusOverlay } from "@/components/status-overlay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/utils";
import { api } from "@/trpc/react";

export const Profile = () => {
  const {
    data: signedInUser,
    isLoading,
    isRefetching,
    isError,
    error,
  } = api.user.signedInUser.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      error={error}
    >
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={signedInUser?.image ?? ""} />
          <AvatarFallback>
            {initialsFromName(signedInUser?.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start gap-2 py-3">
          <span className="text-xl font-bold">{signedInUser?.name}</span>
          <span>{signedInUser?.email}</span>
        </div>
      </div>
    </StatusOverlay>
  );
};
