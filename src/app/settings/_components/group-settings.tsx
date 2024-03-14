"use client";

import { api } from "@/trpc/react";
import { GroupSettingsForm } from "./group-settings-form";
import { StatusOverlay } from "@/components/status-overlay";

export const GroupSettings = () => {
  const { data: user } = api.user.signedInUser.useQuery();
  const groupId = user?.userConfig?.groupId;

  const {
    data: group,
    isLoading,
    isRefetching,
    isError,
    error: groupByIdError,
  } = api.group.byId.useQuery(
    {
      id: groupId!,
    },
    { enabled: !!groupId },
  );

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      errors={[groupByIdError]}
    >
      <GroupSettingsForm
        key={`update-group-form-${group?.updatedAt}`}
        group={group}
      />
    </StatusOverlay>
  );
};
