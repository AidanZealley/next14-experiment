import { Skeleton } from "@/components/ui/skeleton";

export const LatestPostFallback = () => {
  return (
    <div className="grid min-h-[30vh] w-full place-items-center px-6 py-16">
      <div className="grid w-full max-w-5xl gap-6">
        <Skeleton className="h-16 w-full" />

        <div className="grid gap-3">
          <div className="flex items-center gap-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="grid gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
