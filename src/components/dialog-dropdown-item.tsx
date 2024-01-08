import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";

type DialogDropdownItemProps = DialogPrimitive.DialogProps & {
  triggerChildren: React.ReactNode;
  contentProps?: DialogPrimitive.DialogContentProps;
};

export const DialogDropdownItem = ({
  triggerChildren,
  contentProps,
  children,
  ...props
}: DialogDropdownItemProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent {...contentProps}>{children}</DialogContent>
    </Dialog>
  );
};
