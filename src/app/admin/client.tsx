"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";

import { adminHash } from "@/actions/adminHash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminHashSchema } from "@/schema/adminHash";

export const AdminPageClient = () => {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: adminHashSchema });
    },
    shouldValidate: "onBlur",
  });
  const [hash, setHash] = useState("");
  return (
    <form
      {...getFormProps(form)}
      action={async (formData) => {
        const data = await adminHash(formData);
        setHash(data);
      }}
      className="text-left"
    >
      <div>
        <Label htmlFor={fields.value.id}>Value</Label>
        <Input
          required={true}
          {...getInputProps(fields.value, { type: "text" })}
        />
        <p>{hash}</p>
      </div>
      <Button className="mt-3 w-full" type="submit">
        Create hash
      </Button>
    </form>
  );
};
