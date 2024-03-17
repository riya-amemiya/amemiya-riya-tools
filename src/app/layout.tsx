import "the-new-css-reset/css/reset.css";
import "animate.css";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbGenerator } from "@/components/breadcrumbGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { defaultDescription, defaultTitle } from "@/config/defaultMetadata";
import { defaultUrl } from "@/config/defaultUrl";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: defaultTitle,
  description: defaultDescription,
  alternates: {
    canonical: defaultUrl,
  },
  authors: {
    name: "Amemiya Riya",
    url: "https://twitter.com/Riya31377928",
  },
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: defaultUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "Riya31377928",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = ["random", "shorten"];
  return (
    <html lang="ja">
      <body className="w-full">
        <div className="md:grid md:grid-cols-10 md:gap-4 w-full h-full">
          <ScrollArea className="md:col-span-2 rounded-md border h-full">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Tools</h4>
              {links.map((tag) => (
                <>
                  <div className="text-sm" key={tag}>
                    <Link href={`/${tag}`}>{tag}</Link>
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
          <main className="md:col-span-8">
            <BreadcrumbGenerator />
            {children}
          </main>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
