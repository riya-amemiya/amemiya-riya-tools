"use client";

import { useForm, getInputProps, type FieldMetadata } from "@conform-to/react";
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
    rgba: z
      .string()
      .min(1)
      .regex(
        /^rgba\((?:(25[0-5]|2[0-4]\d|[01]?\d\d?), ){3}(0(\.\d+)?|1(\.0+)?)\)$/,
        {
          message: "Invalid rgba",
        },
      ),
    hsla: z.string().min(1),
    cmyk: z.string().min(1),
  });
  const [form, { hexa, rgba, hsla, cmyk }] = useForm({
    defaultValue: {
      hexa: rgbaToHexA(color),
      rgba: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      hsla: "Coming soon",
      cmyk: "Coming soon",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: base64Schema });
    },
    shouldValidate: "onInput",
  });
  const setFormValues = (newColor: RgbaColor) => {
    setColor(newColor);
    form.update({
      name: hexa.name,
      value: rgbaToHexA(newColor),
    });
    form.update({
      name: rgba.name,
      value: `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`,
    });
  };
  const items: {
    type: FieldMetadata<
      string,
      {
        hexa: string;
        rgba: string;
        hsla: string;
        cmyk: string;
      },
      string[]
    >;
    onInput?: (event: FormEvent<HTMLInputElement>) => void;
  }[] = [
    {
      type: hexa,
      onInput: (event) => {
        const value = (event.target as HTMLInputElement).value;
        if (/^#[\dA-Fa-f]{6}([\dA-Fa-f]{2})?$/.test(value)) {
          setFormValues(hexToRgba(value));
        }
      },
    },
    {
      type: rgba,
      onInput: (event) => {
        const value = (event.target as HTMLInputElement).value;
        if (/^rgba\((?:\d{1,3}, ){3}(0(\.\d+)?|1(\.0+)?)\)$/.test(value)) {
          const [r = 0, g = 0, b = 0, a = 1] = value
            .replace(/^rgba\(/, "")
            .replace(/\)$/, "")
            .split(", ")
            .map(Number);
          if (
            r >= 0 &&
            r <= 255 &&
            g >= 0 &&
            g <= 255 &&
            b >= 0 &&
            b <= 255 &&
            a >= 0 &&
            a <= 1
          ) {
            setFormValues({ r, g, b, a });
          }
        }
      },
    },
    { type: hsla },
    { type: cmyk },
  ];
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
          {items.map(({ type, onInput }) => {
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
