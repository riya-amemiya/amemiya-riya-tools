"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { camelCase, kebabCase, slugify } from "umt/String";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsStringCasePageClient = () => {
  const stringCaseSchema = z.object({
    text: z.string().min(1),
  });
  const [form, { text }] = useForm({
    defaultValue: {
      text: "hello world example",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: stringCaseSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center w-full">
      <form
        id={form.id}
        noValidate={true}
        onSubmit={(event) => {
          event.preventDefault();
          form.onSubmit(event);
        }}
      >
        <div>
          <div>
            <Label htmlFor={text.id}>Text</Label>
            <Input {...getInputProps(text, { type: "text" })} />
            <ErrorMessage>{text.errors}</ErrorMessage>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: camelCase(text.value || ""),
            })}
          >
            camelCase
          </Button>
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: kebabCase(text.value || ""),
            })}
          >
            kebab-case
          </Button>
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: slugify(text.value || ""),
            })}
          >
            slugify
          </Button>
        </div>
      </form>
    </div>
  );
};
