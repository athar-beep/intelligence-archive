import type { MetadataRoute } from "next";
import { articles, cases } from "@/lib/content";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"; // Set this environment variable before deployment.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/history", "/roles", "/case-studies", "/gallery", "/articles", "/sources", "/image-credits", "/about"];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-11-05"), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...cases.map((entry) => ({ url: `${base}/case-studies/${entry.id}`, lastModified: new Date("2026-11-05"), changeFrequency: "yearly" as const, priority: 0.55 })),
    ...articles.map((entry) => ({ url: `${base}/articles/${entry.id}`, lastModified: new Date("2026-11-05"), changeFrequency: "yearly" as const, priority: 0.55 }))
  ];
}
