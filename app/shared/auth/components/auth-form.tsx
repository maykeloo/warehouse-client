"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { AuthUser } from "@/app/shared/model/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ApiResponse } from "@/app/shared/model/response";

export const AuthForm = ({ action }: { action: any }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(action, {
    message: "success",
    data: [],
    errors: [],
  } as ApiResponse);

  const form = useForm({
    resolver: zodResolver(AuthUser),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit() {
    form.handleSubmit(() => formRef.current?.submit());
  }

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={onSubmit}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {state.message === "error" &&
        state.errors.map((error) => (
          <Alert
            className="mb-auto mt-8"
            variant="destructive"
            key={error.path}
          >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.path} - {error.message}
            </AlertDescription>
          </Alert>
        ))}
    </>
  );
};
