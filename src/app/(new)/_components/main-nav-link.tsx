"use client";

import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type MainNavLinkProps = {
  href: string;
  matchingSegment: string | null;
  children: React.ReactNode;
};

export const MainNavLink = ({
  href,
  matchingSegment,
  children,
}: MainNavLinkProps) => {
  const segment = useSelectedLayoutSegment();

  return (
    <NavigationMenuItem className="w-full">
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          active={segment === matchingSegment}
          className={cn(
            navigationMenuTriggerStyle(),
            "w-full justify-start px-3",
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
