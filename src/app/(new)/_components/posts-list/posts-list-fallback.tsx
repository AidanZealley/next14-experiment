import { Skeleton } from "@/components/ui/skeleton";

type PostsListFallbackProps = {
  limit: number;
};

export const PostsListFallback = ({ limit }: PostsListFallbackProps) => {
  return (
    <div className="grid gap-10">
      {[...Array(limit).keys()].map((_, index) => (
        <div
          className="grid grid-cols-[theme(spacing.10)_1fr] gap-4"
          key={index}
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-64" />
            </div>

            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
