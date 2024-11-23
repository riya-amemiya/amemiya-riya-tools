import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { UnsafeUnwrappedCookies } from "next/headers";

export const createClient = <Database>(cookieStore: UnsafeUnwrappedCookies) => {
  return createServerClient<Database>(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error("Failed to set cookie", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Failed to remove cookie", error);
          }
        },
      },
    },
  );
};
