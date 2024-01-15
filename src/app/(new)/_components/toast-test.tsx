"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const ToastTest = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Testing",
      description: "Hello, World!",
    });
  };

  return <Button onClick={handleClick}>Toast!</Button>;
};
