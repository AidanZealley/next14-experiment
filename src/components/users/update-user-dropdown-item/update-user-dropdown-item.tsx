import { useState } from "react";
import { DialogDropdownItem } from "@/components/dialog-dropdown-item";
import { UpdateUserDialogContent } from "./";
import { User } from "lucide-react";
import { wait } from "@/lib/utils";

type UpdateUserDropdownItemProps = {
  userId: string;
  closeHandler?: () => void;
};

export const UpdateUserDropdownItem = ({
  userId,
  closeHandler,
}: UpdateUserDropdownItemProps) => {
  const [open, setOpen] = useState(false);
  const dialogCloseHandler = async () => {
    setOpen(false);
    await wait(300);
    closeHandler && closeHandler();
  };

  return (
    <DialogDropdownItem
      open={open}
      onOpenChange={setOpen}
      triggerChildren={<UpdateUserDropdownItemTrigger />}
    >
      <UpdateUserDialogContent
        userId={userId}
        closeHandler={dialogCloseHandler}
      />
    </DialogDropdownItem>
  );
};

const UpdateUserDropdownItemTrigger = () => {
  return (
    <span className="flex items-center gap-2">
      <User className="h-3 w-3" />
      <span>Update User</span>
    </span>
  );
};
