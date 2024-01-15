"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { InvitesBadge } from "./invites/invites-badge";

export const MainNav = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === null}
              className={navigationMenuTriggerStyle()}
            >
              Posts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/users" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === "users"}
              className={navigationMenuTriggerStyle()}
            >
              Users
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/groups" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === "groups"}
              className={navigationMenuTriggerStyle()}
            >
              Groups
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/invites" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === "invites"}
              className={cn([
                "flex items-center gap-2",
                navigationMenuTriggerStyle(),
              ])}
            >
              Invites
              <InvitesBadge />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
