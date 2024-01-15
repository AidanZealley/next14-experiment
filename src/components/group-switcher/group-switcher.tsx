"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { RouterOutputs } from "@/trpc/shared";
import { UserAvatar } from "@/components/user-avatar";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { GroupSwitcherDropdownItem } from "./group-switcher-dropdown-item";
import { CreateGroupDropdownItem } from "./create-group-dropdown-item";

const getSelectedGroup = (
  signedInUserGroups?: RouterOutputs["group"]["signedInUserGroups"],
) => {
  if (signedInUserGroups?.personal.isSelected) {
    return signedInUserGroups?.personal;
  }

  return signedInUserGroups?.groups.filter((group) => group.isSelected)[0];
};

export const GroupSwitcher = () => {
  const [open, setOpen] = useState(false);
  const { data: signedInUser } = api.user.signedInUser.useQuery();
  const { data: signedInUserGroups } = api.group.signedInUserGroups.useQuery();

  const personal = signedInUserGroups?.personal;
  const selected = getSelectedGroup(signedInUserGroups);
  const selectedIsPersonal = selected?.id === personal?.id;
  const nonSelectedGroups = signedInUserGroups?.groups.filter(
    (group) => !group.isSelected,
  );

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="grid w-full grid-cols-[1fr_theme(spacing.4)] gap-3 px-3"
        >
          <span className="grid grid-cols-[auto_1fr] items-center gap-2">
            <UserAvatar
              src={selectedIsPersonal ? signedInUser?.image : undefined}
              name={selectedIsPersonal ? signedInUser?.name : selected?.name}
              className="h-6 w-6"
            />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
              {selectedIsPersonal ? signedInUser?.name : selected?.name}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-40" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" className="w-56">
        <GroupSwitcherDropdownItem
          groupId={personal?.id ?? null}
          image={signedInUser?.image}
          name={signedInUser?.name}
          isSelected={personal?.isSelected}
          closeHandler={closeHandler}
        />
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Groups</DropdownMenuLabel>
        {!selectedIsPersonal ? (
          <GroupSwitcherDropdownItem
            groupId={selected?.id ?? null}
            name={selected?.name}
            isSelected={selected?.isSelected}
            closeHandler={closeHandler}
          />
        ) : null}
        {nonSelectedGroups?.map((group) => (
          <GroupSwitcherDropdownItem
            key={group.id}
            groupId={group.id}
            name={group.name}
            isSelected={group.isSelected}
            closeHandler={closeHandler}
          />
        ))}
        <CreateGroupDropdownItem closeHandler={closeHandler} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
