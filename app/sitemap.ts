import type { MetadataRoute } from "next";
import { seoPages, siteUrl } from "@/lib/seo/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }, ...seoPages.map((page) => ({ url: `${siteUrl}/${page.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: page.kind === "tool" ? 0.9 : 0.7 }))];
}
