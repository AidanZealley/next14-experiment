"use client";

import { cn } from "@/lib/utils";
import { useUIValuesContext } from "@/components/providers/ui-provider";

type SidePanelProps = {
  children: React.ReactNode;
};

export const SidePanel = ({ children }: SidePanelProps) => {
  const { sidePanelOpen } = useUIValuesContext();

  return (
    <div
      className={cn(
        "fixed right-0 grid h-full min-h-0 w-64 md:hidden",
        "border-l border-slate-200 dark:border-slate-800",
        "bg-white dark:bg-slate-950",
        "translate-x-64 transition-transform",
        sidePanelOpen ? "translate-x-0" : "",
      )}
    >
      {children}
    </div>
  );
};
