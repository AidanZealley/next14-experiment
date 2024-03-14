"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MainNavLink } from "./main-nav-link";
import {
  LayoutPanelTop,
  MailOpen,
  MessagesSquare,
  Settings,
} from "lucide-react";

export const MainNav = () => {
  return (
    <NavigationMenu className="max-w-full flex-col items-stretch">
      <NavigationMenuList className="flex-col gap-1">
        <MainNavLink href="/" matchingSegment={null}>
          <span className="flex items-center gap-2">
            <LayoutPanelTop className="h-4 w-4" />
            <span className="text-slate-900 dark:text-white">Overview</span>
          </span>
        </MainNavLink>
        <MainNavLink href="/posts" matchingSegment="posts">
          <span className="flex items-center gap-2">
            <MessagesSquare className="h-4 w-4" />
            <span className="text-slate-900 dark:text-white">Posts</span>
          </span>
        </MainNavLink>
        <MainNavLink href="/invites" matchingSegment="invites">
          <span className="flex items-center gap-2">
            <MailOpen className="h-4 w-4" />
            <span className="text-slate-900 dark:text-white">Invites</span>
          </span>
        </MainNavLink>
        <MainNavLink href="/settings" matchingSegment="settings">
          <span className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="text-slate-900 dark:text-white">Settings</span>
          </span>
        </MainNavLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
