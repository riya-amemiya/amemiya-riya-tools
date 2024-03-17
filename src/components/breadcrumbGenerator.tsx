"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

export const BreadcrumbGenerator = () => {
  const pathname = usePathname();
  const paths = pathname.split("/");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname === "/" ? (
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          paths.map((path, index) => {
            if (index === paths.length - 1) {
              return (
                <BreadcrumbItem key={path}>
                  <BreadcrumbPage>{path}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbLink asChild={true}>
                  <Link href={`/${path}`}>{path || "Home"}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
