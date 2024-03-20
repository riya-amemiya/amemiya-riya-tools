import crypto from "node:crypto";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { links } from "@/lib/links";

const Index = async () => {
  return (
    <div>
      <h1 className="text-3xl my-4">UMT Tools</h1>
      <div className="md:grid md:grid-cols-9 md:gap-4">
        {links.map(({ title, description, href }) => (
          <Card
            className="md:col-span-3"
            key={crypto.createHash("sha256").update(href).digest("hex")}
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{description}</p>
            </CardContent>
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
