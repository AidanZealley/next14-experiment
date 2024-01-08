import { useState } from "react";
import { DialogDropdownItem } from "@/components/dialog-dropdown-item";
import { UpdateGroupMembershipsDialogContent } from ".";
import { Users } from "lucide-react";
import { wait } from "@/lib/utils";

type UpdateGroupMembershipsDropdownItemProps = {
  groupId: string;
  closeHandler?: () => void;
};

export const UpdateGroupMembershipsDropdownItem = ({
  groupId,
  closeHandler,
}: UpdateGroupMembershipsDropdownItemProps) => {
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
      triggerChildren={<UpdateGroupMembershipsDropdownItemTrigger />}
      contentProps={{
        className: "max-w-3xl",
      }}
    >
      <UpdateGroupMembershipsDialogContent
        groupId={groupId}
        closeHandler={dialogCloseHandler}
      />
    </DialogDropdownItem>
  );
};

const UpdateGroupMembershipsDropdownItemTrigger = () => {
  return (
    <span className="flex items-center gap-2">
      <Users className="h-3 w-3" />
      <span>Update Group Memberships</span>
    </span>
  );
};
