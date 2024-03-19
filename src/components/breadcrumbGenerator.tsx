"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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
              <Fragment key={path}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild={true}>
                    <Link href={`/${path}`}>{path || "Home"}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
