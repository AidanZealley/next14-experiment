"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateRoleSchema, createRoleSchema } from "@/lib/schemas/role";
import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateRole = () => {
  const form = useForm<CreateRoleSchema>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    reset,
    formState: { isDirty },
  } = form;
  const utils = api.useUtils();
  const { mutate, isLoading } = api.role.create.useMutation({
    onSuccess() {
      utils.role.all.invalidate();
      reset();
    },
  });

  const onSubmit: SubmitHandler<CreateRoleSchema> = (
    values: z.infer<typeof createRoleSchema>,
    e,
  ) => {
    e?.preventDefault();
    if (!isDirty || isLoading) {
      return;
    }

    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:text-white hover:dark:bg-blue-600"
          >
            Role
          </Button>
        </div>
      </form>
    </Form>
  );
};
