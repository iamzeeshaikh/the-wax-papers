import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, BLOG_POSTS } from "@/lib/blog";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDesc,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDesc,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold mt-10 mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-bold mt-7 mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--color-brown)" }}>
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="font-semibold mt-4 mb-1" style={{ color: "var(--color-charcoal)" }}>
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("| ") && line.includes("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const headers = tableLines[0].split("|").filter((c) => c.trim());
      const rows = tableLines.slice(2).map((r) => r.split("|").filter((c) => c.trim()));
      elements.push(
        <div key={key++} className="overflow-x-auto my-6 rounded-xl border" style={{ borderColor: "var(--color-paper)" }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "var(--color-cream-light)" }}>
              <tr>
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-charcoal)" }}>{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderTop: "1px solid var(--color-paper)" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-2.5 text-sm items-start" style={{ color: "var(--color-text)" }}>
              <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--color-gold);text-decoration:underline">$1</a>') }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\. /)) {
        items.push(lines[i].trim().replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-4 space-y-2 list-none">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-3 text-sm items-start" style={{ color: "var(--color-text)" }}>
              <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center shrink-0 font-bold mt-0.5" style={{ backgroundColor: "var(--color-gold)" }}>{ii + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--color-gold);text-decoration:underline">$1</a>') }} />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.length > 0) {
      const html = line
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--color-gold);text-decoration:underline">$1</a>');
      elements.push(
        <p key={key++} className="my-3 leading-relaxed text-sm" style={{ color: "var(--color-text)" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    i++;
  }
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDesc,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "The Wax Papers" },
    publisher: { "@type": "Organization", name: "The Wax Papers", url: SITE_URL },
  };

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumb crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <section className="py-14" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid lg:grid-cols-3 gap-12">
          {/* Article */}
          <article className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              {post.title}
            </h1>
            <div className="overflow-hidden rounded-2xl mb-8">
              <Image src={post.image} alt={post.imageAlt} width={800} height={450} className="w-full h-72 object-cover" priority />
            </div>
            <div>{renderContent(post.content)}</div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h2 className="text-base font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
                Get a Free Quote
              </h2>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                Ready to order custom food paper for your business? We respond within 24 hours.
              </p>
              <Link href="/get-quote" className="btn-primary w-full justify-center text-sm">
                Request a Quote
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h2 className="text-base font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
                More from the Blog
              </h2>
              <div className="space-y-4">
                {otherPosts.map((p) => (
                  <div key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-sm font-semibold hover:underline" style={{ color: "var(--color-brown)" }}>
                      {p.title}
                    </Link>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{p.readTime}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "var(--color-cream-light)" }}>
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              More Articles
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <article key={p.slug} className="card group">
                  <Link href={`/blog/${p.slug}`} className="block overflow-hidden aspect-[16/9]">
                    <Image src={p.image} alt={p.imageAlt} width={400} height={225} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  </Link>
                  <div className="p-5">
                    <p className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>{p.readTime}</p>
                    <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
                      <Link href={`/blog/${p.slug}`} className="hover:underline">{p.title}</Link>
                    </h3>
                    <Link href={`/blog/${p.slug}`} className="text-xs font-semibold" style={{ color: "var(--color-gold)" }}>Read more →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
