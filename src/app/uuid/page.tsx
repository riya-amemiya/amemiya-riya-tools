import { Card, CardContent } from "@/components/ui/card";

import { UuidHomeClient } from "./client";

const UuidHomePage = async () => {
  return (
    <Card className="max-w-md mx-auto bg-slate-50 rounded-xl shadow-md md:max-w-2xl w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl my-4">UUID Generator</h1>
          <UuidHomeClient />
        </div>
      </CardContent>
    </Card>
  );
};
export default UuidHomePage;
