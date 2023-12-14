"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useSelectedLayoutSegment } from "next/navigation";

export const ProfileNav = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/account" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === null}
              className={navigationMenuTriggerStyle()}
            >
              Profile
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/account/settings" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === "settings"}
              className={navigationMenuTriggerStyle()}
            >
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
