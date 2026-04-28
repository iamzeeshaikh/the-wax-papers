import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";
import { getAllBlogSlugs } from "@/lib/blog";

const BASE = "https://thewaxpapers.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = getAllSlugs().map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogUrls = getAllBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticPages = [
    { url: BASE, priority: 1.0 },
    { url: `${BASE}/about-us`, priority: 0.7 },
    { url: `${BASE}/contact-us`, priority: 0.7 },
    { url: `${BASE}/get-quote`, priority: 0.9 },
    { url: `${BASE}/blog`, priority: 0.7 },
    { url: `${BASE}/sitemap-page`, priority: 0.4 },
    { url: `${BASE}/privacy-policy`, priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`, priority: 0.3 },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...productUrls, ...blogUrls];
}
