"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateGroupSchema } from "@/lib/schemas/group";

type UpdateGroupFormProps = {
  form: UseFormReturn<UpdateGroupSchema>;
  submitHandler: (values: UpdateGroupSchema) => void;
};

export const UpdateGroupForm = ({
  form,
  submitHandler,
}: UpdateGroupFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="grid gap-6">
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
      </form>
    </Form>
  );
};
