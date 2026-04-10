"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { parseQueryString } from "umt/module/URL/parseQueryString";
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

export const ToolsUrlParserPageClient = () => {
  const [state, setState] = useState<Record<string, string> | null>(null);
  const urlParserSchema = z.object({
    url: z.string(),
  });
  const [form, fields] = useForm({
    defaultValue: {
      url: "https://example.com/path?name=John&age=30&city=Tokyo",
    },
    onSubmit(formData) {
      const { url } = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof urlParserSchema>,
          {
            value: string;
          }
        >;
      setState(parseQueryString(url.value));
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: urlParserSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center">
      {state !== null && (
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(state).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
          <Label htmlFor={fields.url.id}>URL</Label>
          <Input {...getInputProps(fields.url, { type: "text" })} />
          <ErrorMessage>{fields.url.errors}</ErrorMessage>
        </div>
        <Button className="mt-4" type="submit">
          Parse
        </Button>
      </form>
    </div>
  );
};
