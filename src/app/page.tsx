import crypto from "node:crypto";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = async () => {
  const links: {
    title: string;
    description: string;
    href: string;
  }[] = [
    {
      title: "Random Number",
      description: "Generate a random number",
      href: "random",
    },
    {
      title: "Shorten URL",
      description: "Shorten a URL",
      href: "shorten",
    },
  ];
  return (
    <div>
      <h1 className="text-3xl my-4">UMT Tools</h1>
      <div className="flex items-center gap-2">
        {links.map(({ title, href }) => (
          <Card
            className="w-1/3"
            key={crypto.createHash("sha256").update(href).digest("hex")}
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button asChild={true} className="w-20" key={href}>
                <Link href={href}>Link</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Index;
