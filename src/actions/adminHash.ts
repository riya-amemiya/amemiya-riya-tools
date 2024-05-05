"use server";

import { parseWithZod } from "@conform-to/zod";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";

import { adminHashSchema } from "@/schema/adminHash";
export async function adminHash(formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: adminHashSchema,
  });

  if (submission.status !== "success") {
    redirect("/admin");
  }

  const value = formData.get("value") as string;
  // md5に変換する処理
  const hashMd5 = CryptoJS.MD5(value).toString();
  return hashMd5;
}
