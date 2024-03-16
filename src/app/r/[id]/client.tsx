"use client";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";

export const RedirectPageClient = ({
  originalUrl,
  referer,
}: {
  originalUrl: string;
  referer: string;
}) => {
  const pathOnly = usePathname();
  console.log(referer, pathOnly);
  useEffect(() => {
    history.replaceState(null, "", pathOnly);
    // 同じURLにはリダイレクトしない
    if (originalUrl !== referer) {
      redirect(originalUrl);
    }
  }, [pathOnly, referer, originalUrl]);
  return (
    <Card className="max-w-md mx-auto bg-slate-50 rounded-xl shadow-md md:max-w-2xl w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          {pathOnly}
        </div>
      </CardContent>
    </Card>
  );
};
