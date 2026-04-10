"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { toOrdinal } from "umt/module/Number/toOrdinal";
import { toPercentage } from "umt/module/Number/toPercentage";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsNumberFormatterPageClient = () => {
  const [state, setState] = useState<{
    ordinal: string;
    percentage: number;
  } | null>(null);
  const numberFormatterSchema = z.object({
    value: z.number(),
    total: z.number(),
  });
  const [form, fields] = useForm({
    defaultValue: {
      value: 1,
      total: 10,
    },
    onSubmit(formData) {
      const { value, total } = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof numberFormatterSchema>,
          {
            value: string;
          }
        >;
      const valueNum = +value.value;
      const totalNum = +total.value;
      setState({
        ordinal: toOrdinal(valueNum),
        percentage: toPercentage(valueNum, totalNum),
      });
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: numberFormatterSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center">
      {state !== null && (
        <div className="mb-4">
          <p>Ordinal: {state.ordinal}</p>
          <p>Percentage: {state.percentage}%</p>
        </div>
      )}
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
            <Label htmlFor={fields.value.id}>Value</Label>
            <Input {...getInputProps(fields.value, { type: "number" })} />
            <ErrorMessage>{fields.value.errors}</ErrorMessage>
          </div>
          <div>
            <Label htmlFor={fields.total.id}>Total</Label>
            <Input {...getInputProps(fields.total, { type: "number" })} />
            <ErrorMessage>{fields.total.errors}</ErrorMessage>
          </div>
        </div>
        <Button className="mt-4" type="submit">
          Format
        </Button>
      </form>
    </div>
  );
};
