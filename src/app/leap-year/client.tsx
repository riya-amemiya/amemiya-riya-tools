"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { isLeapYear } from "umt/Date";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsLeapYearPageClient = () => {
  const [state, setState] = useState<string | null>(null);
  const leapYearSchema = z.object({
    year: z.number(),
  });
  const [form, fields] = useForm({
    defaultValue: {
      year: 2024,
    },
    onSubmit(formData) {
      const { year } = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof leapYearSchema>,
          {
            value: string;
          }
        >;
      const yearNumber = +year.value;
      setState(
        isLeapYear(yearNumber)
          ? `${yearNumber} is a leap year`
          : `${yearNumber} is not a leap year`,
      );
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: leapYearSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center">
      {state !== null && <p className="mb-4">{state}</p>}
      <form
        id={form.id}
        noValidate={true}
        onSubmit={(event) => {
          event.preventDefault();
          form.onSubmit(event);
        }}
      >
        <div>
          <Label htmlFor={fields.year.id}>Year</Label>
          <Input {...getInputProps(fields.year, { type: "number" })} />
          <ErrorMessage>{fields.year.errors}</ErrorMessage>
        </div>
        <Button className="mt-4" type="submit">
          Check
        </Button>
      </form>
    </div>
  );
};
