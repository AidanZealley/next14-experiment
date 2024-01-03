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
      </NavigationMenuList>
    </NavigationMenu>
  );
};
