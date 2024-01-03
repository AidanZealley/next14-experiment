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
import { CreateGroupSchema } from "@/lib/schemas/group";

type CreateGroupFormProps = {
  form: UseFormReturn<CreateGroupSchema>;
  submitHandler: (values: CreateGroupSchema) => void;
};

export const CreateGroupForm = ({
  form,
  submitHandler,
}: CreateGroupFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="grid gap-6">
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
