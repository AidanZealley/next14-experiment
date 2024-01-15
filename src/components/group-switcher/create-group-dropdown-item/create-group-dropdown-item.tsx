import { useState } from "react";
import { DialogDropdownItem } from "@/components/dialog-dropdown-item";
import { CreateGroupDialogContent } from ".";
import { PlusCircle } from "lucide-react";
import { wait } from "@/lib/utils";

type CreateGroupDropdownItemProps = {
  closeHandler?: () => void;
};

export const CreateGroupDropdownItem = ({
  closeHandler,
}: CreateGroupDropdownItemProps) => {
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
      triggerChildren={<CreateGroupDialogDropdownItemTrigger />}
    >
      <CreateGroupDialogContent closeHandler={dialogCloseHandler} />
    </DialogDropdownItem>
  );
};

const CreateGroupDialogDropdownItemTrigger = () => {
  return (
    <span className="flex items-center gap-2">
      <PlusCircle className="h-6 w-6 p-1 opacity-40" />
      New Group
    </span>
  );
};
