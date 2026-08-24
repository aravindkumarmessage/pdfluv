import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/content";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/download/", "/jobs/"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
