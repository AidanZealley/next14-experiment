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

export const SettingsNav = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === null}
              className={navigationMenuTriggerStyle()}
            >
              Details
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem color="red">
          <Link href="/settings/danger" legacyBehavior passHref>
            <NavigationMenuLink
              active={segment === "danger"}
              className={navigationMenuTriggerStyle()}
            >
              Danger Zone
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
