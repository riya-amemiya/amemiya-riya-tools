"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { hashConverterSchema } from "@/schema/hashConverter";
import type { Database } from "@/types/supabase";

export async function hashConverter(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient<Database>(cookieStore);
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
