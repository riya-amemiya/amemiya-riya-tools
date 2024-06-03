"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { hashConverterSchema } from "@/schema/hashConverter";
import type { Database } from "@/types/supabase";

export async function hashConverter(formData: FormData) {
  const supabase = createClient<Database>();
  const submission = parseWithZod(formData, {
    schema: hashConverterSchema,
  });

  if (submission.status !== "success") {
    redirect("/hash");
  }

  const value = formData.get("value") as string;
  const data = await supabase.from("md5").select().eq("hash", value);
  if (data.data?.length === 0) {
    return false;
  }
  return data.data ?? false;
}
