import { Card, CardContent } from "@/components/ui/card";

import { ToolsColorConverterPageClient } from "./client";

const ToolsColorConverterPage = () => {
  return (
    <Card className="max-w-screen-xl bg-slate-50 rounded-xl shadow-md w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl my-4">Color Converter</h1>
          <ToolsColorConverterPageClient />
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolsColorConverterPage;
