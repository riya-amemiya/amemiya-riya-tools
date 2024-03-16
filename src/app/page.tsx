import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = async () => {
  return (
    // 真ん中に表示する
    <Card className="max-w-md mx-auto bg-slate-50 rounded-xl shadow-md md:max-w-2xl w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl my-4">UMT Tools</h1>
          <Button asChild={true}>
            <Link href="/shorten">Short URL</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default Index;
