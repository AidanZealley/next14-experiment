"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { initialsFromName } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";

export const Profile = () => {
  const {
    data: signedInUser,
    isLoading,
    isRefetching,
  } = api.user.signedInUser.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isRefetching) {
    return <p>Refreshing...</p>;
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-6">
      <Avatar className="h-32 w-32 rounded-md">
        <AvatarImage src={signedInUser?.image ?? ""} />
        <AvatarFallback>{initialsFromName(signedInUser?.name)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start gap-2 py-3">
        <span className="text-xl font-bold">{signedInUser?.name}</span>
        <span>{signedInUser?.email}</span>
        <Button asChild>
          <Link href="/account/settings">Edit Details</Link>
        </Button>
      </div>
    </div>
  );
};
