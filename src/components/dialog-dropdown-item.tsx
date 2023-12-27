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
};

export const DialogDropdownItem = ({
  triggerChildren,
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
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
