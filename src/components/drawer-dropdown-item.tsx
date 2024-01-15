import { Drawer as DrawerPrimitive } from "vaul";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { forwardRef } from "react";

type DrawerDropdownItemProps = React.ComponentProps<
  typeof DrawerPrimitive.Root
> & {
  triggerChildren: React.ReactNode;
  contentProps?: React.ComponentProps<typeof DrawerPrimitive.Content>;
};

export const DrawerDropdownItem = forwardRef<
  HTMLDivElement,
  DrawerDropdownItemProps
>(({ triggerChildren, contentProps, children, ...props }, ref) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent {...contentProps} ref={ref}>
        {children}
      </DrawerContent>
    </Drawer>
  );
});
