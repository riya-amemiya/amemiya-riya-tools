"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { escapeHtml, unescapeHtml } from "umt/String";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ToolsHtmlEscapePageClient = () => {
  const htmlEscapeSchema = z.object({
    text: z.string().min(1),
  });
  const [form, { text }] = useForm({
    defaultValue: {
      text: '<div class="hello">World</div>',
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: htmlEscapeSchema });
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
            <Textarea {...getInputProps(text, { type: "text" })} />
            <ErrorMessage>{text.errors}</ErrorMessage>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: escapeHtml(text.value || ""),
            })}
          >
            Escape
          </Button>
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: unescapeHtml(text.value || ""),
            })}
          >
            Unescape
          </Button>
        </div>
      </form>
    </div>
  );
};
