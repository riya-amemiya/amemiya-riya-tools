"use client";

import { useForm, getInputProps, type FieldMetadata } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { type FormEvent, useState } from "react";
import { type RgbaColor, RgbaColorPicker } from "react-colorful";
import { hexaToRgba } from "umt/module/Color/hexaToRgba";
import { rgbaToCmyk } from "umt/module/Color/rgbaToCmyk";
import { rgbaToHexA } from "umt/module/Color/rgbaToHexA";
import { rgbaToHsla } from "umt/module/Color/rgbaToHsla";
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
    hsla: z
      .string()
      .min(1)
      .regex(
        /^hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?)\s*\)$/,
        {
          message: "Invalid hsla",
        },
      ),
    cmyk: z
      .string()
      .min(1)
      .regex(/^cmyk\((?:\d{1,3}, ){3}\d{1,3}\)$/, {
        message: "Invalid cmyk",
      }),
  });
  let temporaryHsla = rgbaToHsla(color);
  let temporaryCmyk = rgbaToCmyk(color);
  const [form, { hexa, rgba, hsla, cmyk }] = useForm({
    defaultValue: {
      hexa: rgbaToHexA(color),
      rgba: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      hsla: `hsla(${temporaryHsla.h}, ${temporaryHsla.s}%, ${temporaryHsla.l}%, ${temporaryHsla.a})`,
      cmyk: `cmyk(${temporaryCmyk.c}, ${temporaryCmyk.m}, ${temporaryCmyk.y}, ${temporaryCmyk.k})`,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: base64Schema });
    },
    shouldValidate: "onInput",
  });
  const setFormValues = (newColor: RgbaColor) => {
    setColor(newColor);
    temporaryHsla = rgbaToHsla(newColor);
    temporaryCmyk = rgbaToCmyk(newColor);
    form.update({
      name: hexa.name,
      value: rgbaToHexA(newColor),
    });
    form.update({
      name: rgba.name,
      value: `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`,
    });
    form.update({
      name: hsla.name,
      value: `hsla(${temporaryHsla.h}, ${temporaryHsla.s}%, ${temporaryHsla.l}%, ${temporaryHsla.a})`,
    });
    form.update({
      name: cmyk.name,
      value: `cmyk(${temporaryCmyk.c}, ${temporaryCmyk.m}, ${temporaryCmyk.y}, ${temporaryCmyk.k})`,
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
    onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  }[] = [
    {
      type: hexa,
      onBlur: (event) => {
        const value = (event.target as HTMLInputElement).value;
        if (/^#[\dA-Fa-f]{6}([\dA-Fa-f]{2})?$/.test(value)) {
          setFormValues(hexaToRgba(value));
        }
      },
    },
    {
      type: rgba,
      onBlur: (event) => {
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
    {
      type: hsla,
      onBlur: (event) => {
        const value = (event.target as HTMLInputElement).value;
        if (
          /^hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?)\s*\)$/.test(
            value,
          )
        ) {
          const [h = 0, s = 0, l = 0, a = 1] = value
            .replace(/^hsla\(/, "")
            .replace(/\)$/, "")
            .split(", ")
            .map(Number);
          if (
            h >= 0 &&
            h <= 360 &&
            s >= 0 &&
            s <= 100 &&
            l >= 0 &&
            l <= 100 &&
            a >= 0 &&
            a <= 1
          ) {
            setFormValues({
              r: 0,
              g: 0,
              b: 0,
              a: 1,
            });
          }
        }
      },
    },
    {
      type: cmyk,
      onBlur: (event) => {
        const value = (event.target as HTMLInputElement).value;
        if (/^cmyk\((?:\d{1,3}, ){3}\d{1,3}\)$/.test(value)) {
          const [c = 0, m = 0, y = 0, k = 0] = value
            .replace(/^cmyk\(/, "")
            .replace(/\)$/, "")
            .split(", ")
            .map(Number);
          if (
            c >= 0 &&
            c <= 100 &&
            m >= 0 &&
            m <= 100 &&
            y >= 0 &&
            y <= 100 &&
            k >= 0 &&
            k <= 100
          ) {
            setFormValues({
              r: 0,
              g: 0,
              b: 0,
              a: 1,
            });
          }
        }
      },
    },
  ];
  return (
    <div className="text-center w-full">
      <div className="flex items-center justify-center mb-5">
        <RgbaColorPicker
          color={color}
          onChange={(newColor: RgbaColor) => {
            setFormValues(newColor);
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
          {items.map(({ type, onBlur }) => {
            return (
              <div className="md:col-span-6" key={type.name}>
                <Label htmlFor={type.id}>{type.name.toUpperCase()}</Label>
                <Input
                  onBlur={onBlur}
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
