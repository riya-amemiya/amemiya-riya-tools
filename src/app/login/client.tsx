"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schema/login";

export const LoginPageClient = () => {
  // eslint-disable-next-line unicorn/no-useless-undefined
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });
  return (
    <form {...getFormProps(form)} action={action}>
      <Label htmlFor={fields.email.id}>Email:</Label>
      <Input
        required={true}
        {...getInputProps(fields.email, { type: "email" })}
      />
      <Label htmlFor={fields.password.id}>Password:</Label>
      <Input
        required={true}
        {...getInputProps(fields.password, { type: "password" })}
      />
      <Button type="submit">Log in</Button>
    </form>
  );
};
