"use client";

import { useUIActionsContext } from "@/components/providers/ui-provider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const SidePanelClose = () => {
  const { toggleSidePanelOpen } = useUIActionsContext();

  const handleCloseClick = () => {
    toggleSidePanelOpen(false);
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleCloseClick}>
      <X className="h-6 w-6" />
    </Button>
  );
};
