"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MainNavLink } from "./main-nav-link";
import { MailOpen, MessagesSquare } from "lucide-react";

export const MainNav = () => {
  return (
    <NavigationMenu className="max-w-full flex-col items-stretch">
      <NavigationMenuList className="flex-col gap-1">
        <MainNavLink href="/" matchingSegment={null}>
          <span className="flex items-center gap-2">
            <MessagesSquare className="h-4 w-4" />
            <span>Posts</span>
          </span>
        </MainNavLink>
        <MainNavLink href="/" matchingSegment="settings">
          <span className="flex items-center gap-2">
            <MailOpen className="h-4 w-4" />
            <span>Invites</span>
          </span>
        </MainNavLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
