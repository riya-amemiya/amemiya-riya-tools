import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export async function GET() {
  const supabase = createClient<Database>();
  await supabase.auth.signOut();
  redirect("/");
}
