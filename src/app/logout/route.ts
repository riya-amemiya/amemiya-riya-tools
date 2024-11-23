import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient<Database>(cookieStore);
  await supabase.auth.signOut();
  redirect("/");
}
