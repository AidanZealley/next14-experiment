import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  UpdateGroupMembershipsTable,
  UpdateGroupMembershipsTableHeader,
} from "../update-group-memberships-table";

type UpdateGroupMembershipsDialogContentProps = {
  groupId: string;
  closeHandler: () => void;
};

export const UpdateGroupMembershipsDialogContent = ({
  groupId,
  closeHandler,
}: UpdateGroupMembershipsDialogContentProps) => {
  return (
    <>
      <DialogHeader>Update Group Memberships</DialogHeader>
      <UpdateGroupMembershipsTable groupId={groupId}>
        <UpdateGroupMembershipsTableHeader />
      </UpdateGroupMembershipsTable>
      <DialogFooter>
        <div className="flex w-full justify-between gap-6">
          <Button variant="outline" onClick={closeHandler}>
            Close
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
