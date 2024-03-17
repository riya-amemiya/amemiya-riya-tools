import { Card, CardContent } from "@/components/ui/card";

import { ToolsBase64PageClient } from "./client";

const ToolsBase64Page = () => {
  return (
    <Card className="max-w-md mx-auto bg-slate-50 rounded-xl shadow-md md:max-w-2xl w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl my-4">Base64</h1>
          <ToolsBase64PageClient />
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolsBase64Page;
