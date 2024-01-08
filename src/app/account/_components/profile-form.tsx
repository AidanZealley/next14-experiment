"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { UpdateUserSchema, updateUserSchema } from "@/lib/schemas/user";
import { UserForm } from "@/components/users/user-form";
import { useEffect } from "react";
import { StatusOverlay } from "@/components/status-overlay";

export const ProfileForm = () => {
  const {
    data: signedInUser,
    isLoading,
    isRefetching,
    isError,
    error,
    isFetchedAfterMount,
  } = api.user.signedInUser.useQuery();
  const utils = api.useUtils();
  const { mutate } = api.user.update.useMutation({
    onSuccess() {
      utils.user.signedInUser.invalidate();
    },
  });
  const defaultValues = {
    ...signedInUser,
    name: signedInUser?.name ?? "",
    email: signedInUser?.email ?? "",
    isAdmin: signedInUser?.isAdmin ?? false,
  };
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;

  const submitHandler: SubmitHandler<UpdateUserSchema> = (
    values: z.infer<typeof updateUserSchema>,
  ) => {
    mutate(values);
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    if (isFetchedAfterMount) {
      reset(defaultValues);
    }
  }, [isFetchedAfterMount]);

  return (
    <StatusOverlay
      isLoading={isLoading}
      isRefetching={isRefetching}
      isError={isError}
      errors={[error]}
    >
      <div className="grid gap-6">
        <UserForm
          user={signedInUser}
          form={form}
          submitHandler={submitHandler}
        />
        <div className="flex justify-between gap-6">
          <Button disabled={!isDirty} onClick={handleReset}>
            Reset
          </Button>
          <Button disabled={!isDirty} onClick={handleSubmit(submitHandler)}>
            Update
          </Button>
        </div>
      </div>
    </StatusOverlay>
  );
};
