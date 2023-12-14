"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CreatePostSchema, createPostSchema } from "@/lib/schemas/post";
import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreatePost = () => {
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      text: "",
    },
  });
  const {
    reset,
    formState: { isDirty },
  } = form;
  const utils = api.useUtils();
  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess() {
      utils.post.all.invalidate();
      utils.post.latest.invalidate();
      reset();
    },
  });

  const onSubmit: SubmitHandler<CreatePostSchema> = (
    values: z.infer<typeof createPostSchema>,
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
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Write a post..."
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="bg-blue-500 dark:bg-blue-700 dark:text-white"
          >
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
