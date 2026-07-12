import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";
import { getAllBlogSlugs } from "@/lib/blog";
import { locations } from "@/lib/locations";

const BASE = "https://thewaxpapers.co.uk";

// Stable last-modified date. Bump this when content is materially updated. Using
// a fixed date instead of new Date() stops every URL's lastmod resetting on each
// build/deploy, which Google learns to distrust.
const LASTMOD = new Date("2026-07-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = getAllSlugs().map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogUrls = getAllBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const locationUrls = locations.map((loc) => ({
    url: `${BASE}/locations/${loc.slug}`,
    lastModified: LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const staticPages = [
    { url: BASE, priority: 1.0 },
    { url: `${BASE}/about-us`, priority: 0.7 },
    { url: `${BASE}/contact-us`, priority: 0.7 },
    { url: `${BASE}/get-quote`, priority: 0.9 },
    { url: `${BASE}/blog`, priority: 0.7 },
    { url: `${BASE}/locations`, priority: 0.8 },
    { url: `${BASE}/sitemap-page`, priority: 0.4 },
    { url: `${BASE}/privacy-policy`, priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`, priority: 0.3 },
  ].map((p) => ({
    ...p,
    lastModified: LASTMOD,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...productUrls, ...locationUrls, ...blogUrls];
}
