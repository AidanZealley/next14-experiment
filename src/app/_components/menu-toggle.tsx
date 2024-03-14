"use client";

import { useUIActionsContext } from "@/components/providers/ui-provider";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const MenuToggle = () => {
  const { toggleSidePanelOpen } = useUIActionsContext();

  const handleCloseClick = () => {
    toggleSidePanelOpen();
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleCloseClick}>
      <Menu className="h-6 w-6" />
    </Button>
  );
};
