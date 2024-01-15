import { Skeleton } from "@/components/ui/skeleton";

export const ProfileFallback = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6">
      <Skeleton className="h-24 w-24 rounded-full" />

      <div className="flex flex-col items-start gap-2 py-3">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-6 w-36" />
        <span className="text-xl font-bold">Aidan Zealley</span>
        <span>aidan@zealley.com</span>
      </div>
    </div>
  );
};
