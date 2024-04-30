import { redirect } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

import { AdminPageClient } from "./client";

const AdminPage = async () => {
  const supabase = createClient<Database>();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <Card className="max-w-screen-xl bg-slate-50 rounded-xl shadow-md w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl my-4">Admin</h1>
          <AdminPageClient />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
