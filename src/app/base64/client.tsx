"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { fromBase64 } from "umt/module/String/fromBase64";
import { toBase64 } from "umt/module/String/toBase64";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsBase64PageClient = () => {
  const base64Schema = z.object({
    text: z.string().min(1),
  });
  const [form, { text }] = useForm({
    defaultValue: {
      text: "Hello",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: base64Schema });
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
              value: toBase64(text.value || ""),
            })}
          >
            Encode
          </Button>
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: (() => {
                try {
                  return fromBase64(text.value || "");
                } catch {
                  return text.value;
                }
              })(),
            })}
          >
            Decode
          </Button>
        </div>
      </form>
    </div>
  );
};
