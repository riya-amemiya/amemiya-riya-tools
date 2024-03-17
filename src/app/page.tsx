import Link from "next/link";

import { Button } from "@/components/ui/button";

const Index = async () => {
  return (
    <div>
      <h1 className="text-3xl my-4">UMT Tools</h1>
      <div className="flex items-center gap-2">
        <Button asChild={true}>
          <Link href="/random">Random</Link>
        </Button>
        <Button asChild={true}>
          <Link href="/shorten">Short URL</Link>
        </Button>
      </div>
    </div>
  );
};
export default Index;
