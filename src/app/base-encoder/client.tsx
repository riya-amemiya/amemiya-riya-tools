"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { decodeBase32 } from "umt/module/Crypto/decodeBase32";
import { decodeBase58 } from "umt/module/Crypto/decodeBase58";
import { encodeBase32 } from "umt/module/Crypto/encodeBase32";
import { encodeBase58 } from "umt/module/Crypto/encodeBase58";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsBaseEncoderPageClient = () => {
  const baseEncoderSchema = z.object({
    text: z.string().min(1),
  });
  const [form, { text }] = useForm({
    defaultValue: {
      text: "Hello, World!",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: baseEncoderSchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center w-full">
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
            <Label htmlFor={text.id}>Text</Label>
            <Input {...getInputProps(text, { type: "text" })} />
            <ErrorMessage>{text.errors}</ErrorMessage>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: encodeBase32(text.value || ""),
            })}
          >
            Base32 Encode
          </Button>
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: (() => {
                try {
                  return new TextDecoder().decode(
                    decodeBase32(text.value || ""),
                  );
                } catch {
                  return text.value;
                }
              })(),
            })}
          >
            Base32 Decode
          </Button>
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: encodeBase58(text.value || ""),
            })}
          >
            Base58 Encode
          </Button>
          <Button
            className="mt-4"
            type="submit"
            {...form.update.getButtonProps({
              name: text.name,
              value: (() => {
                try {
                  return new TextDecoder().decode(
                    decodeBase58(text.value || ""),
                  );
                } catch {
                  return text.value;
                }
              })(),
            })}
          >
            Base58 Decode
          </Button>
        </div>
      </form>
    </div>
  );
};
