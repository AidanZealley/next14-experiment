"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateGroupSchema, createGroupSchema } from "@/lib/schemas/group";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateGroupForm } from "./create-group-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type CreateGroupProps = {
  children?: React.ReactNode;
};

export const CreateGroup = ({ children }: CreateGroupProps) => {
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
    event,
  ) => {
    event?.preventDefault();
    if (!isDirty || isLoading) {
      return;
    }

    mutate(values);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children ? children : <Button>Create Group</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Group</DrawerTitle>
          <DrawerDescription>
            Create a new group and invite people.
          </DrawerDescription>
        </DrawerHeader>

        <CreateGroupForm form={form} submitHandler={submitHandler} />

        <DrawerFooter>
          <div className="flex w-full justify-between gap-6">
            <DrawerClose onClick={closeHandler}>
              <Button>Cancel</Button>
            </DrawerClose>
            <Button onClick={handleSubmit(submitHandler)} disabled={isLoading}>
              {isLoading ? "Creating" : "Create Group"}
            </Button>
          </div>
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
