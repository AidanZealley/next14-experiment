import { SiteLogo } from "@/components/site-logo";
import { MenuToggle } from "./menu-toggle";

export const MobileHeader = () => {
  return (
    <div className="flex h-12 items-center justify-between gap-6 border-b border-slate-200 pl-6 pr-3 dark:border-slate-800 md:hidden">
      <SiteLogo />

      <MenuToggle />
    </div>
  );
};
