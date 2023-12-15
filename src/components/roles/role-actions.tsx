"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { RoleForm } from "./role-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateRoleSchema, updateRoleSchema } from "@/lib/schemas/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@/server/db/schema";
import { z } from "zod";
import { RoleActionsMenu } from "./role-actions-menu";

type RoleActionsProps = {
  role: Role;
};

export const RoleActions = ({ role }: RoleActionsProps) => {
  const utils = api.useUtils();
  const { mutate } = api.role.update.useMutation({
    onSuccess() {
      utils.role.all.invalidate();
    },
  });
  const { id } = role;
  const form = useForm<UpdateRoleSchema>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      id,
      name: role.name ?? "",
    },
  });
  const onSubmit: SubmitHandler<UpdateRoleSchema> = (
    values: z.infer<typeof updateRoleSchema>,
    e,
  ) => {
    e?.preventDefault();
    mutate(values);
  };

  return (
    <Dialog>
      <RoleActionsMenu roleId={role.id}>
        <DialogTrigger asChild>
          <DropdownMenuItem>
            <span className="flex items-center gap-2">
              <Pencil className="h-3 w-3" />
              <span>Update</span>
            </span>
          </DropdownMenuItem>
        </DialogTrigger>
      </RoleActionsMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <RoleForm form={form} submitHandler={onSubmit} />
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
