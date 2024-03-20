import type { MetadataRoute } from "next";

import { defaultUrl } from "@/config/defaultUrl";
import { links } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: defaultUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...links.map((link) => {
      const url = `${defaultUrl}/${link.href}`;
      const lastModified = new Date();
      const changeFrequency:
        | "daily"
        | "always"
        | "hourly"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never" = "daily";
      const priority = 0.8;
      return {
        url,
        lastModified,
        changeFrequency,
        priority,
      };
    }),
  ];
}
