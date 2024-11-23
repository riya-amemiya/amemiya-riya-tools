"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { division } from "umt/module/Math/division";
import { roundOf } from "umt/module/Math/roundOf";
import { subtract } from "umt/module/Math/subtract";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const MicrowaveOvenCalculatorClient = () => {
  const [state, setState] = useState<
    {
      power: number;
      seconds: number;
      minutes: [number, number];
    }[]
  >([]);
  const microwaveOvenCalculatorSchema = z.object({
    power: z.number(),
    time: z.number(),
    unit: z.union([z.literal("second"), z.literal("minute")]),
  });
  const [form, fields] = useForm({
    defaultValue: {
      power: 500,
      time: 1,
      unit: "minute",
    },
    onSubmit(formData) {
      const target = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof microwaveOvenCalculatorSchema>,
          {
            value: string;
          }
        >;
      const {
        power,
        time,
        unit,
      }: z.infer<typeof microwaveOvenCalculatorSchema> = {
        power: Number.parseInt(target.power.value),
        time: Number.parseInt(target.time.value),
        unit: target.unit.value as "second" | "minute",
      };

      if (
        microwaveOvenCalculatorSchema.safeParse({
          power: power,
          time: time,
          unit: unit,
        }).success === false
      ) {
        return;
      }

      setState(
        Array.from({ length: 11 })
          .map((_, index) => 500 + index * 100)
          .map((p) => {
            const s = roundOf(
              division(power * time * (unit === "minute" ? 60 : 1), p),
              2,
            );
            const remainder = roundOf(s % 60, 2);
            return {
              power: p,
              seconds: s,
              minutes: [division(subtract(s, remainder), 60), remainder],
            };
          }),
      );
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: microwaveOvenCalculatorSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center">
      <form
        id={form.id}
        noValidate={true}
        onSubmit={(event) => {
          event.preventDefault();
          form.onSubmit(event);
        }}
      >
        <div className="flex gap-2">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <Label htmlFor={fields.power.id}>Power</Label>
              <Input {...getInputProps(fields.power, { type: "number" })} />
              <ErrorMessage>{fields.power.errors}</ErrorMessage>
            </div>
            <div className="col-span-4">
              <Label htmlFor={fields.time.id}>Time</Label>
              <Input {...getInputProps(fields.time, { type: "number" })} />
              <ErrorMessage>{fields.time.errors}</ErrorMessage>
            </div>
            <div className="col-span-4">
              <Label htmlFor={fields.unit.id}>Unit</Label>
              <Select
                defaultValue={fields.unit.value}
                key={fields.unit.key}
                name={fields.unit.name}
                required={fields.unit.required}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Please select a unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="second">sec</SelectItem>
                    <SelectItem value="minute">min</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ErrorMessage>{fields.unit.errors}</ErrorMessage>
            </div>
          </div>
        </div>
        <Button className="mt-4" type="submit">
          Calculate
        </Button>
      </form>
      <Table>
        <TableCaption>Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Power</TableHead>
            <TableHead className="text-center">Seconds</TableHead>
            <TableHead className="text-center">Minutes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.map((s) => (
            <TableRow key={s.power}>
              <TableCell>{s.power}W</TableCell>
              <TableCell>{s.seconds}s</TableCell>
              <TableCell>
                {s.minutes[0]}m{s.minutes[1]}s
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
