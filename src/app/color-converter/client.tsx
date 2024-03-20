"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { type FormEvent, useState } from "react";
import { type RgbaColor, RgbaColorPicker } from "react-colorful";
import { hexToRgba } from "umt/module/Tool/hexToRgba";
import { rgbaToHexA } from "umt/module/Tool/rgbaToHexA";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsColorConverterPageClient = () => {
  const [color, setColor] = useState({ r: 106, g: 27, b: 154, a: 0.5 });
  const base64Schema = z.object({
    hexa: z
      .string()
      .min(1)
      .regex(/^#[\dA-Fa-f]{6}([\dA-Fa-f]{2})?$/, { message: "Invalid hexa" }),
    rgba: z.string().min(1),
    hsla: z.string().min(1),
    cmyk: z.string().min(1),
  });
  const [form, { hexa, rgba, hsla, cmyk }] = useForm({
    defaultValue: {
      hexa: rgbaToHexA(color),
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: base64Schema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center w-full">
      <div className="flex items-center justify-center mb-5">
        <RgbaColorPicker
          color={color}
          onChange={(newColor: RgbaColor) => {
            setColor(newColor);
            form.update({
              name: hexa.name,
              value: rgbaToHexA(newColor),
            });
            form.update({
              name: rgba.name,
              value: `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`,
            });
          }}
        />
      </div>
      <form
        id={form.id}
        noValidate={true}
        onSubmit={(event) => {
          event.preventDefault();
          form.onSubmit(event);
        }}
      >
        <div className="md:grid md:grid-cols-12 md:gap-4">
          {[
            {
              type: hexa,
              onInput: (event: FormEvent<HTMLInputElement>) => {
                const value = (event.target as HTMLInputElement).value;
                if (/^#[\dA-Fa-f]{6}([\dA-Fa-f]{2})?$/.test(value)) {
                  setColor(hexToRgba(value));
                }
              },
            },
            { type: rgba },
            { type: hsla },
            { type: cmyk },
          ].map(({ type, onInput }) => {
            return (
              <div className="md:col-span-3" key={type.name}>
                <Label htmlFor={type.id}>{type.name.toUpperCase()}</Label>
                <Input
                  onInput={onInput}
                  {...getInputProps(type, { type: "text" })}
                />
                <ErrorMessage>{type.errors}</ErrorMessage>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
