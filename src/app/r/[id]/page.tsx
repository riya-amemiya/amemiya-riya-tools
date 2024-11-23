import { cookies, headers } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

import { RedirectPageClient } from "./client";

const RedirectPage = async ({
  params,
}: { params: Promise<{ id: string }> }) => {
  const cookieStore = await cookies();
  const supabase = createClient<Database>(cookieStore);
  const headersList = await headers();
  const referer = headersList.get("referer") || "/";
  const { id } = await params;
  const { data } = await supabase
    .from("short_urls")
    .select("origin_url")
    .eq("id", id)
    .single();

  return (
    <RedirectPageClient
      originalUrl={data?.origin_url || ""}
      referer={referer}
    />
  );
};

export default RedirectPage;
