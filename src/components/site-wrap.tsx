import { cn } from "@/lib/utils";

type SiteWrapProps = {
  className?: string;
  children: React.ReactNode;
};

export const SiteWrap = ({ className, children }: SiteWrapProps) => {
  return (
    <div className={cn("flex justify-center px-6", className)}>
      <div className="w-full max-w-7xl">{children}</div>
    </div>
  );
};
