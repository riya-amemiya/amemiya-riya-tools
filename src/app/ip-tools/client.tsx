"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { getIpClass, ipToLong, isPrivateIp, longToIp } from "umt/IP";
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

export const ToolsIpToolsPageClient = () => {
  const [state, setState] = useState<{
    ipLong: number;
    reverse: string;
    isPrivate: boolean;
    ipClass: string;
  } | null>(null);
  const ipToolsSchema = z.object({
    ip: z.string().min(1),
  });
  const [form, fields] = useForm({
    defaultValue: {
      ip: "192.168.1.1",
    },
    onSubmit(formData) {
      const { ip } = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof ipToolsSchema>,
          {
            value: string;
          }
        >;
      try {
        const ipLong = ipToLong(ip.value);
        const reverse = longToIp(ipLong);
        setState({
          ipLong,
          reverse,
          isPrivate: isPrivateIp(ip.value),
          ipClass: getIpClass(ip.value),
        });
      } catch {
        // Don't update state on error
      }
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ipToolsSchema });
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
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>IP Long</TableCell>
                <TableCell>{state.ipLong}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Reverse</TableCell>
                <TableCell>{state.reverse}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Private</TableCell>
                <TableCell>{state.isPrivate ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Class</TableCell>
                <TableCell>{state.ipClass}</TableCell>
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
          <Label htmlFor={fields.ip.id}>IP Address</Label>
          <Input {...getInputProps(fields.ip, { type: "text" })} />
          <ErrorMessage>{fields.ip.errors}</ErrorMessage>
        </div>
        <Button className="mt-4" type="submit">
          Analyze
        </Button>
      </form>
    </div>
  );
};
