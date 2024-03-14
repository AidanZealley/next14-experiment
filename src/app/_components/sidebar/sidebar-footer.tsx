import { AuthMenu } from "@/components/auth-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export const SidebarFooter = () => {
  return (
    <>
      <Separator />

      <div className="flex justify-between gap-3 py-3">
        <ModeToggle />
        <AuthMenu />
      </div>
    </>
  );
};
