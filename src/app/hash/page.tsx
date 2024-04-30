import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

const HashPage = async () => {
  const supabase = createClient<Database>();
  const { data } = await supabase.from("md5_int").select("*").limit(10);
  return (
    <Card className="max-w-screen-xl bg-slate-50 rounded-xl shadow-md w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl my-4">Hash Converter</h1>
          {data?.map((item) => (
            <div
              className="flex flex-row items-center justify-between w-full"
              key={item.hash}
            >
              <span>{item.hash}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HashPage;
