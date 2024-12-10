import "the-new-css-reset/css/reset.css";
import "animate.css";
import "@/styles/globals.css";
import crypto from "node:crypto";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { BreadcrumbGenerator } from "@/components/breadcrumbGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { defaultDescription, defaultTitle } from "@/config/defaultMetadata";
import { defaultUrl } from "@/config/defaultUrl";
import { links } from "@/lib/links";

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
  const headerLinks: {
    title: string | React.ReactNode;
    href: string;
    key: string;
  }[] = [
    {
      title: "Source Code",
      href: "https://github.com/riya-amemiya/amemiya-riya-tools",
      key: crypto.createHash("sha256").update("Source Code").digest("hex"),
    },
  ];
  return (
    <html lang="ja">
      <head>
        {process.env.NODE_ENV !== "production" && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body className="w-full">
        <div className="w-full border-b">
          <header>
            <nav className="p-2">
              <ul className="flex gap-6 items-center text-sm">
                <li>
                  <Link href="/">UMT Tools</Link>
                </li>
                {headerLinks.map((link) => (
                  <li key={link.key}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </header>
        </div>
        <div className="md:grid md:grid-cols-10 md:gap-4 w-full h-full">
          <ScrollArea className="md:col-span-2 h-full max-sm:hidden">
            <div className="md:p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                <Link href="/">Tools</Link>
              </h4>
              {links.map(({ href }) => (
                <Fragment
                  key={crypto.createHash("sha256").update(href).digest("hex")}
                >
                  <div className="text-sm">
                    <Link href={`/${href}`}>{href}</Link>
                  </div>
                  <Separator className="my-2" />
                </Fragment>
              ))}
            </div>
          </ScrollArea>
          <main className="md:col-span-8 md:p-4">
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
