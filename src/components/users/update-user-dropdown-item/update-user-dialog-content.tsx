import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, updateUserSchema } from "@/lib/schemas/user";
import { UserForm } from "@/components/users/user-form";
import { DialogFooter } from "@/components/ui/dialog";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { StatusOverlay } from "@/components/status-overlay";

type UpdateUserDialogContentProps = {
  userId: string;
  closeHandler: () => void;
};

export const UpdateUserDialogContent = ({
  userId,
  closeHandler,
}: UpdateUserDialogContentProps) => {
  const {
    data: user,
    isLoading,
    isRefetching,
    isError,
    error,
    isFetchedAfterMount,
  } = api.user.byId.useQuery({
    id: userId,
  });
  const utils = api.useUtils();
  const { mutate, isLoading: isUpdating } = api.user.update.useMutation({
    onSuccess: () => {
      utils.user.all.invalidate();
      closeHandler();
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
      <StatusOverlay
        isLoading={isLoading}
        isRefetching={isRefetching}
        isError={isError}
        error={error}
      >
        <UserForm user={user} form={form} submitHandler={submitHandler} />
      </StatusOverlay>
      <DialogFooter>
        <div className="flex w-full justify-between gap-6">
          <Button onClick={closeHandler}>Cancel</Button>
          <Button
            onClick={handleSubmit(submitHandler)}
            disabled={isLoading || isRefetching || isError}
          >
            {isUpdating ? "Updating" : "Save changes"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
