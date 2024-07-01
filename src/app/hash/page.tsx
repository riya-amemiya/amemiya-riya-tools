import { Card, CardContent } from "@/components/ui/card";

import { HashPageClient } from "./client";

const HashPage = async () => {
  return (
    <Card className="max-w-screen-xl bg-slate-50 rounded-xl shadow-md w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl my-4">Hash Converter</h1>
          <HashPageClient />
        </div>
      </CardContent>
    </Card>
  );
};

export default HashPage;
