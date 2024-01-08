import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateGroupSchema, updateGroupSchema } from "@/lib/schemas/group";
import { UpdateGroupForm } from "@/components/groups/update-group-form";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { StatusOverlay } from "@/components/status-overlay";
import { useToast } from "@/components/ui/use-toast";

type UpdateGroupDialogContentProps = {
  groupId: string;
  closeHandler: () => void;
};

export const UpdateGroupDialogContent = ({
  groupId,
  closeHandler,
}: UpdateGroupDialogContentProps) => {
  const utils = api.useUtils();

  const { toast } = useToast();

  const {
    data: group,
    isLoading,
    isRefetching,
    isError,
    error: groupByIdError,
    isFetchedAfterMount,
  } = api.group.byId.useQuery({
    id: groupId,
  });

  const { mutate, isLoading: isUpdating } = api.group.update.useMutation({
    onSuccess: () => {
      utils.group.all.invalidate();
      closeHandler();
    },
    onError: (error) => {
      toast({
        title: error.data?.code,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const submitHandler: SubmitHandler<UpdateGroupSchema> = (values) => {
    mutate(values);
  };

  const defaultValues = {
    id: groupId,
    name: group?.name ?? "",
  };

  const form = useForm<UpdateGroupSchema>({
    resolver: zodResolver(updateGroupSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (isFetchedAfterMount) {
      reset(defaultValues);
    }
  }, [isFetchedAfterMount]);

  return (
    <>
      <DialogHeader>Update Group</DialogHeader>
      <StatusOverlay
        isLoading={isLoading}
        isRefetching={isRefetching}
        isError={isError}
        error={groupByIdError}
      >
        <UpdateGroupForm form={form} submitHandler={submitHandler} />
      </StatusOverlay>
      <DialogFooter>
        <div className="flex w-full justify-between gap-6">
          <Button variant="outline" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(submitHandler)}
            disabled={isLoading || isRefetching || isError || isUpdating}
          >
            {isUpdating ? "Updating" : "Save changes"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
