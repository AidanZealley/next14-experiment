import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGroupSchema, createGroupSchema } from "@/lib/schemas/group";
import { CreateGroupForm } from "@/components/groups/create-group-form";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type CreateGroupDialogContentProps = {
  closeHandler: () => void;
};

export const CreateGroupDialogContent = ({
  closeHandler,
}: CreateGroupDialogContentProps) => {
  const utils = api.useUtils();

  const { toast } = useToast();

  const { mutate, isLoading } = api.group.create.useMutation({
    onSuccess: () => {
      utils.group.all.invalidate();
      utils.group.signedInUserGroups.invalidate();
      utils.user.signedInUser.invalidate();
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

  const submitHandler: SubmitHandler<CreateGroupSchema> = (values) => {
    mutate(values);
  };

  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit } = form;

  return (
    <>
      <DialogHeader>Create Group</DialogHeader>
      <CreateGroupForm form={form} submitHandler={submitHandler} />
      <DialogFooter>
        <div className="flex w-full justify-between gap-6">
          <Button variant="outline" onClick={closeHandler}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(submitHandler)} disabled={isLoading}>
            {isLoading ? "Creating" : "Add Group"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
