import { useState } from "react";
import { DialogDropdownItem } from "@/components/dialog-dropdown-item";
import { UpdateGroupDialogContent } from "./";
import { Group } from "lucide-react";
import { wait } from "@/lib/utils";

type UpdateGroupDropdownItemProps = {
  groupId: string;
  closeHandler?: () => void;
};

export const UpdateGroupDropdownItem = ({
  groupId,
  closeHandler,
}: UpdateGroupDropdownItemProps) => {
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
      triggerChildren={<UpdateGroupDropdownItemTrigger />}
    >
      <UpdateGroupDialogContent
        groupId={groupId}
        closeHandler={dialogCloseHandler}
      />
    </DialogDropdownItem>
  );
};

const UpdateGroupDropdownItemTrigger = () => {
  return (
    <span className="flex items-center gap-2">
      <Group className="h-3 w-3" />
      <span>Update Group</span>
    </span>
  );
};
