"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { random } from "umt/module/Math/random";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsRandomPageClient = () => {
  const [state, setState] = useState(0);
  const randomSchema = z.object({
    min: z.number(),
    max: z.number(),
  });
  const [form, fields] = useForm({
    defaultValue: {
      min: 0,
      max: 100,
    },
    onSubmit(formData) {
      const { min, max } = formData.target as typeof formData.target & {
        min: {
          value: string;
        };
        max: {
          value: string;
        };
      };
      setState(random(+min.value, +max.value));
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: randomSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center">
      <p>{state}</p>
      <form
        id={form.id}
        noValidate={true}
        onSubmit={(event) => {
          event.preventDefault();
          form.onSubmit(event);
        }}
      >
        <div className="flex gap-2">
          <div>
            <Label htmlFor={fields.min.id}>Min</Label>
            <Input {...getInputProps(fields.min, { type: "number" })} />
            <ErrorMessage>{fields.min.errors}</ErrorMessage>
          </div>
          <div>
            <Label htmlFor={fields.max.id}>Max</Label>
            <Input {...getInputProps(fields.max, { type: "number" })} />
            <ErrorMessage>{fields.max.errors}</ErrorMessage>
          </div>
        </div>
        <Button className="mt-4" type="submit">
          Generate Random Number
        </Button>
      </form>
    </div>
  );
};
