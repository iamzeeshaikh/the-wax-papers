import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Custom Wax Paper & Food Packaging Insights",
  description: "Advice, guides, and insights for UK food businesses on custom wax paper, greaseproof paper, and food packaging. From The Wax Papers.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndexPage() {
  return (
    <>
      <Breadcrumb crumbs={[{ label: "Blog" }]} />
      <section className="py-16" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide">
          <div className="mb-12">
            <span className="badge mb-3">Insights & Guides</span>
            <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              The Wax Papers Blog
            </h1>
            <p className="max-w-xl" style={{ color: "var(--color-text-muted)" }}>
              Practical advice on custom food paper, packaging, and branding for UK food businesses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="card group">
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    width={500}
                    height={280}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 leading-snug" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
                    <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold inline-flex items-center gap-1"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Read more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
