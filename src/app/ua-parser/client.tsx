"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { parseUserAgent } from "umt/module/UA/parseUserAgent";
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

export const ToolsUaParserPageClient = () => {
  const [state, setState] = useState<{
    os: string;
    browser: string;
    device: string;
  } | null>(null);
  const uaParserSchema = z.object({
    userAgent: z.string().min(1),
  });
  const [form, { userAgent }] = useForm({
    defaultValue: {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    onSubmit(formData) {
      const target = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof uaParserSchema>,
          { value: string }
        >;
      setState(parseUserAgent(target.userAgent.value));
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: uaParserSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center w-full">
      {state !== null && (
        <div className="mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>OS</TableCell>
                <TableCell>{state.os}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Browser</TableCell>
                <TableCell>{state.browser}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Device</TableCell>
                <TableCell>{state.device}</TableCell>
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
          <div>
            <Label htmlFor={userAgent.id}>User Agent</Label>
            <Input {...getInputProps(userAgent, { type: "text" })} />
            <ErrorMessage>{userAgent.errors}</ErrorMessage>
          </div>
        </div>
        <Button className="mt-4" type="submit">
          Parse
        </Button>
      </form>
    </div>
  );
};
