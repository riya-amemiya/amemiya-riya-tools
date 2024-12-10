"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { uuidGeneratorSchema } from "@/schema/uuidGenerator";
import type { paths } from "@/types/mygptsApi";

export async function uuidGenerator(formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: uuidGeneratorSchema,
  });

  if (submission.status !== "success") {
    redirect("/uuid");
  }

  const version = submission.value.version;
  const data = await fetch(`${process.env.MYGPTS_API_URL}/uuid/${version}`);
  return data.json() as Promise<
    paths[`/uuid/${typeof version}`]["get"]["responses"]["200"]["content"]["application/json"]
  >;
}
