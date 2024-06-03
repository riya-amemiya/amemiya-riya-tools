"use server";

import { parseWithZod } from "@conform-to/zod";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { adminHashSchema } from "@/schema/adminHash";
import type { Database } from "@/types/supabase";
export async function adminHash(formData: FormData) {
  const supabase = createClient<Database>();
  const submission = parseWithZod(formData, {
    schema: adminHashSchema,
  });

  if (submission.status !== "success") {
    redirect("/admin");
  }

  const value = formData.get("value") as string;
  // md5に変換する処理
  const hashMd5 = CryptoJS.MD5(value).toString();
  const data = await supabase.from("md5").select().eq("hash", hashMd5);
  if (data.data?.length === 0) {
    await supabase.from("md5").insert({
      hash: hashMd5,
      value,
    });
  }
  return hashMd5;
}
