import { Rocket, Scan } from "lucide-react";

export const SiteLogo = () => {
  return (
    <span className="flex items-center gap-1">
      <Scan className="h-5 w-5" strokeWidth={1.5} />
      <span className="text-lg font-extrabold leading-tight">
        label<span className="font-light">sync</span>
      </span>
    </span>
  );
};
