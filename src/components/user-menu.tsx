"use client";

import { ChevronDown, LogOut, MoreVertical, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { api } from "@/trpc/react";

export function UserMenu() {
  const { data: signedInUser } = api.user.signedInUser.useQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="pl-2 pr-1">
          <span className="flex items-center gap-1">
            <UserAvatar
              src={signedInUser?.image}
              name={signedInUser?.name}
              className="h-6 w-6"
            />
            <MoreVertical className="h-4 w-4" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/api/auth/signout">
            <span className="flex items-center gap-2">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
