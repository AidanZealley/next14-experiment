"use client";

import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateGroupSchema, updateGroupSchema } from "@/lib/schemas/group";
import { RouterOutputs } from "@/trpc/shared";
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
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
import { Check, Undo } from "lucide-react";

type GroupSettingsFormProps = {
  group: RouterOutputs["group"]["byId"];
};

export const GroupSettingsForm = ({ group }: GroupSettingsFormProps) => {
  const utils = api.useUtils();
  const { toast } = useToast();

  const defaultValues = {
    id: group?.id,
    name: group?.name,
  };

  const form = useForm<UpdateGroupSchema>({
    resolver: zodResolver(updateGroupSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;

  const { mutate, isLoading: isUpdating } = api.group.update.useMutation({
    onSuccess: (response) => {
      console.log(response);
      utils.group.byId.invalidate({
        id: group?.id,
      });
    },
    onError: (error) => {
      toast({
        title: error.data?.code,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const submitHandler: SubmitHandler<UpdateGroupSchema> = (
    values: UpdateGroupSchema,
  ) => {
    mutate(values);
  };

  const handleReset = () => {
    reset();
  };

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
        <div className="flex justify-between gap-6">
          <Button
            type="button"
            variant="secondary"
            disabled={!isDirty}
            onClick={handleReset}
          >
            <span className="flex items-center gap-2">
              <Undo className="h-4 w-4" />
              Reset
            </span>
          </Button>

          <Button disabled={!isDirty} onClick={handleSubmit(submitHandler)}>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Update
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
