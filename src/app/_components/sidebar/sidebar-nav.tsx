import { cn } from "@/lib/utils";
import { MainNav } from "../main-nav";

export const SidebarNav = () => {
  return (
    <div className="relative">
      <SidebarNavFade position="top" />

      <div className="relative z-0">
        <MainNav />
      </div>

      <SidebarNavFade position="bottom" />
    </div>
  );
};

type SidebarNavFade = {
  position: "top" | "bottom";
};

const SidebarNavFade = ({ position }: SidebarNavFade) => {
  return (
    <div
      className={cn(
        "pointer-events-none sticky z-10 h-5 w-full",
        "from-slate-50 to-transparent dark:from-slate-900",
        position === "top" ? " top-0 bg-gradient-to-b" : "",
        position === "bottom" ? " bottom-0 bg-gradient-to-t" : "",
      )}
    />
  );
};
