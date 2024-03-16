import { cookies, headers } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

import { RedirectPageClient } from "./client";

const RedirectPage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  const headersList = headers();
  const referer = headersList.get("referer") || "/";
  const { data } = await supabase
    .from("short_urls")
    .select("origin_url")
    .eq("id", params.id)
    .single();

  return (
    <RedirectPageClient
      originalUrl={data?.origin_url || ""}
      referer={referer}
    />
  );
};

export default RedirectPage;
