"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";

type SecondaryNavProps = {
  children: React.ReactNode;
};

export const SecondaryNav = ({ children }: SecondaryNavProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
        <NavigationMenuItem>{children}</NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
