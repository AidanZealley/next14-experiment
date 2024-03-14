import { SiteLogo } from "@/components/site-logo";
import { GroupSwitcherFallback } from "../group-switcher/group-switcher-fallback";
import { Suspense } from "react";
import { GroupSwitcher } from "../group-switcher";
import { SidePanelClose } from "../side-panel/side-panel-close";

export const SidebarHeader = () => {
  return (
    <div className="grid gap-6">
      <div className="flex h-10 items-center justify-between gap-3 pl-3">
        <SiteLogo />

        <div className="block md:hidden">
          <SidePanelClose />
        </div>
      </div>

      <Suspense fallback={<GroupSwitcherFallback />}>
        <GroupSwitcher />
      </Suspense>
    </div>
  );
};
