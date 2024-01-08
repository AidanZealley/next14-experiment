"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateGroupSchema, createGroupSchema } from "@/lib/schemas/group";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { CreateGroupForm } from "./create-group-form";

export const CreateGroup = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form;
  const utils = api.useUtils();
  const { mutate, isLoading } = api.group.create.useMutation({
    onSuccess() {
      utils.group.all.invalidate();
      closeHandler();
    },
  });

  const closeHandler = () => {
    setOpen(false);
    reset();
  };

  const submitHandler: SubmitHandler<CreateGroupSchema> = (
    values: z.infer<typeof createGroupSchema>,
    e,
  ) => {
    e?.preventDefault();
    if (!isDirty || isLoading) {
      return;
    }

    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent>
        <CreateGroupForm form={form} submitHandler={submitHandler} />
        <DialogFooter>
          <div className="flex w-full justify-between gap-6">
            <Button onClick={closeHandler}>Cancel</Button>
            <Button onClick={handleSubmit(submitHandler)} disabled={isLoading}>
              {isLoading ? "Creating" : "Create Group"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
