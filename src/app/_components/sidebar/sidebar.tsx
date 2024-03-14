import { SidebarFooter, SidebarHeader } from ".";
import { SidebarNav } from "./sidebar-nav";

export const Sidebar = () => {
  return (
    <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-1 bg-slate-50 dark:bg-slate-900">
      <div className="px-3 pt-6">
        <SidebarHeader />
      </div>

      <div className="overflow-auto px-3">
        <SidebarNav />
      </div>

      <div className="px-6">
        <SidebarFooter />
      </div>
    </div>
  );
};
