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
            "data-[active]:bg-indigo-900/5 data-[active]:text-indigo-500 dark:data-[active]:bg-indigo-600/5",
            "hover:bg-indigo-900/10 hover:text-indigo-500 dark:hover:bg-indigo-600/10 dark:hover:text-indigo-500",
            "w-full justify-start bg-slate-50 px-3 dark:bg-slate-900 ",
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
