"use client";

import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";

import { uuidGenerator } from "@/actions/uuidGenerator";
import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uuidGeneratorSchema } from "@/schema/uuidGenerator";

export const UuidHomeClient = () => {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: uuidGeneratorSchema });
    },
    shouldValidate: "onBlur",
  });
  const [uuid, setUuid] = useState("");
  return (
    <form
      {...getFormProps(form)}
      action={async (formData) => {
        const data = await uuidGenerator(formData);
        if (data) {
          setUuid(data.message);
        }
      }}
      className="text-center w-full"
    >
      <div>
        <Select
          key={fields.version.key}
          name={fields.version.name}
          required={fields.version.required}
        >
          <SelectTrigger className="w-1/2 mx-auto">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="v1">Version 1</SelectItem>
              <SelectItem value="v4">Version 4</SelectItem>
              <SelectItem value="v6">Version 6</SelectItem>
              <SelectItem value="v7">Version 7</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ErrorMessage>{fields.version.errors}</ErrorMessage>
      </div>
      <Button className="mt-4">Create</Button>
      <div className="mt-4">{uuid}</div>
    </form>
  );
};
