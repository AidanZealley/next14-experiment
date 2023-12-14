import { Rocket } from "lucide-react";

export const SiteLogo = () => {
  return (
    <span className="flex items-center gap-2">
      <Rocket />
      <span className="text-lg font-bold">MyApp</span>
    </span>
  );
};
