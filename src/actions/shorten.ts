"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export async function shorten(data: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient<Database>(cookieStore);
  const response = await supabase
    .from("short_urls")
    .insert({ origin_url: data.get("url") as string })
    .select();
  if (response.status === 201 && response.error === null) {
    redirect(`/shorten/${response.data[0]?.id}`);
  }
}
