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
  const [form, fields] = useForm({
    defaultValue: {
      text: "Hello",
    },
    onSubmit(formData) {
      const { text } = formData.target as typeof formData.target &
        Record<keyof z.infer<typeof base64Schema>, { value: string }>;
      const submitterName = (
        (formData.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement
      ).name as "encode" | "decode";
      if (submitterName === "encode") {
        form.update({
          name: fields.text.name,
          value: toBase64(text.value),
        });
      } else {
        form.update({
          name: fields.text.name,
          value: fromBase64(text.value),
        });
      }
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
            <Label htmlFor={fields.text.id}>Text</Label>
            <Input {...getInputProps(fields.text, { type: "text" })} />
            <ErrorMessage>{fields.text.errors}</ErrorMessage>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button className="mt-4" name="encode" type="submit">
            Encode
          </Button>
          <Button className="mt-4" name="decode" type="submit">
            Decode
          </Button>
        </div>
      </form>
    </div>
  );
};
