"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { average } from "umt/module/Math/average";
import { median } from "umt/module/Math/median";
import { standardDeviation } from "umt/module/Math/standardDeviation";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ToolsMathStatisticsPageClient = () => {
  const [state, setState] = useState<{
    avg: number;
    med: number;
    stdDev: number;
  } | null>(null);
  const mathStatisticsSchema = z.object({
    numbers: z.string().min(1),
  });
  const [form, fields] = useForm({
    defaultValue: {
      numbers: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
    },
    onSubmit(formData) {
      const { numbers } = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof mathStatisticsSchema>,
          {
            value: string;
          }
        >;
      const parsed = numbers.value.split(",").map((s) => Number(s.trim()));
      if (parsed.some((n) => Number.isNaN(n))) {
        return;
      }
      setState({
        avg: average(parsed),
        med: median(parsed),
        stdDev: standardDeviation(parsed),
      });
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: mathStatisticsSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center">
      {state !== null && (
        <div className="mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statistic</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Average</TableCell>
                <TableCell>{state.avg}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Median</TableCell>
                <TableCell>{state.med}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Standard Deviation</TableCell>
                <TableCell>{state.stdDev}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
        <div>
          <Label htmlFor={fields.numbers.id}>Numbers (comma-separated)</Label>
          <Input {...getInputProps(fields.numbers, { type: "text" })} />
          <ErrorMessage>{fields.numbers.errors}</ErrorMessage>
        </div>
        <Button className="mt-4" type="submit">
          Calculate
        </Button>
      </form>
    </div>
  );
};
