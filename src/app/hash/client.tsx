"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";

import { hashConverter } from "@/actions/hashConverter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hashConverterSchema } from "@/schema/hashConverter";
import type { Database } from "@/types/supabase";

export const HashPageClient = () => {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: hashConverterSchema });
    },
    shouldValidate: "onBlur",
  });
  const [hash, setHash] = useState<
    Database["public"]["Tables"]["md5"]["Row"][]
  >([]);
  return (
    <form
      {...getFormProps(form)}
      action={async (formData) => {
        const data = await hashConverter(formData);
        if (data) {
          setHash(data);
        } else {
          setHash([]);
        }
      }}
      className="text-left"
    >
      <div>
        <Label htmlFor={fields.value.id}>Value</Label>
        <Input
          required={true}
          {...getInputProps(fields.value, { type: "text" })}
        />
        {hash.length === 0 ? (
          <p>No hash found</p>
        ) : (
          hash.map((row) => {
            return (
              <div key={row.hash}>
                <p>type: MD5</p>
                <p>value: {row.value}</p>
              </div>
            );
          })
        )}
      </div>
      <Button className="mt-3 w-full" type="submit">
        Convert hash
      </Button>
    </form>
  );
};
