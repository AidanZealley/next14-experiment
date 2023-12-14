"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { UpdateUserSchema, updateUserSchema } from "@/lib/schemas/user";

export const ProfileForm = () => {
  const { data: signedInUser } = api.user.signedInUser.useQuery();
  const utils = api.useUtils();
  const { mutate } = api.user.update.useMutation({
    onSuccess() {
      utils.user.signedInUser.invalidate();
    },
  });
  const defaultValues = {
    ...signedInUser,
    name: signedInUser?.name ?? "",
  };
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues,
  });
  const {
    reset,
    formState: { isDirty },
  } = form;

  const handleReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<UpdateUserSchema> = (
    values: z.infer<typeof updateUserSchema>,
    e,
  ) => {
    e?.preventDefault();
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-6">
          <Button type="button" disabled={!isDirty} onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" disabled={!isDirty}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};
