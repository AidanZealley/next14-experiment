import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, updateUserSchema } from "@/lib/schemas/user";
import { UserForm } from "@/components/users/user-form";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { StatusOverlay } from "@/components/status-overlay";
import { useToast } from "@/components/ui/use-toast";

type UpdateUserDialogContentProps = {
  userId: string;
  closeHandler: () => void;
};

export const UpdateUserDialogContent = ({
  userId,
  closeHandler,
}: UpdateUserDialogContentProps) => {
  const utils = api.useUtils();
  const { toast } = useToast();

  const {
    data: user,
    isLoading,
    isRefetching,
    isError,
    error: userByIdError,
    isFetchedAfterMount,
  } = api.user.byId.useQuery({
    id: userId,
  });

  const { mutate, isLoading: isUpdating } = api.user.update.useMutation({
    onSuccess: () => {
      utils.user.all.invalidate();
      utils.user.byId.invalidate({
        id: userId,
      });
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

  const submitHandler: SubmitHandler<UpdateUserSchema> = (values) => {
    mutate(values);
  };

  const defaultValues = {
    id: userId,
    name: user?.name ?? "",
    email: user?.email ?? "",
    isAdmin: user?.isAdmin ?? false,
  };

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
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
      <DialogHeader>Update User</DialogHeader>
      <StatusOverlay
        isLoading={isLoading}
        isRefetching={isRefetching}
        isError={isError}
        errors={[userByIdError]}
      >
        <UserForm user={user} form={form} submitHandler={submitHandler} />
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
