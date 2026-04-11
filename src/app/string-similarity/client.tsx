"use client";

import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { levenshteinDistance, stringSimilarity } from "umt/String";
import { z } from "zod";

import { ErrorMessage } from "@/components/form/errorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ToolsStringSimilarityPageClient = () => {
  const [state, setState] = useState<{
    distance: number;
    similarity: number;
  } | null>(null);
  const stringSimilaritySchema = z.object({
    string1: z.string(),
    string2: z.string(),
  });
  const [form, fields] = useForm({
    defaultValue: {
      string1: "kitten",
      string2: "sitting",
    },
    onSubmit(formData) {
      const { string1, string2 } = formData.target as typeof formData.target &
        Record<
          keyof z.infer<typeof stringSimilaritySchema>,
          {
            value: string;
          }
        >;
      setState({
        distance: levenshteinDistance(string1.value, string2.value),
        similarity: stringSimilarity(string1.value, string2.value),
      });
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: stringSimilaritySchema });
    },
    shouldValidate: "onInput",
  });
  return (
    <div className="text-center">
      {state !== null && (
        <div className="mb-4">
          <p>Levenshtein Distance: {state.distance}</p>
          <p>Similarity: {(state.similarity * 100).toFixed(2)}%</p>
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
        <div className="flex gap-2">
          <div>
            <Label htmlFor={fields.string1.id}>String 1</Label>
            <Input {...getInputProps(fields.string1, { type: "text" })} />
            <ErrorMessage>{fields.string1.errors}</ErrorMessage>
          </div>
          <div>
            <Label htmlFor={fields.string2.id}>String 2</Label>
            <Input {...getInputProps(fields.string2, { type: "text" })} />
            <ErrorMessage>{fields.string2.errors}</ErrorMessage>
          </div>
        </div>
        <Button className="mt-4" type="submit">
          Compare
        </Button>
      </form>
    </div>
  );
};
