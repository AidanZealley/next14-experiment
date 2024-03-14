import { Skeleton } from "@/components/ui/skeleton";
import { ChevronsUpDown } from "lucide-react";

export const GroupSwitcherFallback = () => {
  return (
    <div className="grid h-11 w-full grid-cols-[1fr_theme(spacing.4)] items-center gap-3 rounded-md px-3">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>

      <ChevronsUpDown className="h-4 w-4 opacity-40" />
    </div>
  );
};
