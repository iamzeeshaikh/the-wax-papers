import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getAllSlugs } from "@/lib/products";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import ProductLeadForm from "@/components/ProductLeadForm";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.metaTitle,
    description: product.metaDesc,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDesc,
      url: `${SITE_URL}/${slug}`,
      images: [{ url: `${SITE_URL}${product.image}`, alt: product.imageAlt }],
    },
  };
}

// Internal link map for contextual linking within body copy
const INTERNAL_LINKS: Record<string, string> = {
  "custom wax paper": "/custom-wax-paper",
  "greaseproof paper": "/greaseproof-paper",
  "printed greaseproof paper": "/printed-greaseproof-paper",
  "branded greaseproof paper": "/branded-greaseproof-paper",
  "burger wrapping paper": "/burger-wrapping-paper",
  "custom burger paper": "/custom-burger-paper",
  "sandwich wrapping paper": "/sandwich-wrapping-paper",
  "custom sandwich paper": "/custom-sandwich-paper",
  "deli paper": "/deli-paper",
  "custom deli paper": "/custom-deli-paper",
  "butcher paper": "/butcher-paper",
  "cheese wrapping paper": "/cheese-wrapping-paper",
  "kraft wax paper": "/kraft-wax-paper",
  "wax paper sheets": "/wax-paper-sheets",
  "wax paper rolls": "/wax-paper-rolls",
  "food wrapping paper": "/food-wrapping-paper",
  "eco-friendly wax paper": "/eco-friendly-wax-paper",
  "bakery wrapping paper": "/bakery-wrapping-paper",
  "wholesale wax paper": "/wholesale-wax-paper",
};

function addInternalLinks(text: string, currentSlug: string): React.ReactNode[] {
  const words = text;
  const parts: React.ReactNode[] = [];
  let remaining = words;
  let keyCount = 0;

  // Sort by length descending so longer phrases match first
  const phrases = Object.keys(INTERNAL_LINKS).sort((a, b) => b.length - a.length);

  while (remaining.length > 0) {
    let matched = false;
    const lowerRemaining = remaining.toLowerCase();

    for (const phrase of phrases) {
      const href = INTERNAL_LINKS[phrase];
      // Skip linking to the current page
      if (href === `/${currentSlug}`) continue;

      const idx = lowerRemaining.indexOf(phrase);
      if (idx !== -1) {
        if (idx > 0) {
          parts.push(remaining.slice(0, idx));
        }
        const exactText = remaining.slice(idx, idx + phrase.length);
        parts.push(
          <Link
            key={`link-${keyCount++}`}
            href={href}
            className="underline decoration-dotted underline-offset-2"
            style={{ color: "var(--color-brown)" }}
          >
            {exactText}
          </Link>
        );
        remaining = remaining.slice(idx + phrase.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      parts.push(remaining);
      remaining = "";
    }
  }

  return parts;
}

const TRUST_BADGES = [
  { label: "Food-Safe Certified", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { label: "UK Supplier", icon: "M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8L3 21" },
  { label: "7–10 Day Dispatch", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const WHY_POINTS = [
  "UK-based food paper specialist",
  "Food-safe certified materials and inks",
  "Free digital proof with every order",
  "Low minimum order quantities",
  "Fast 7–10 working day turnaround",
  "Dedicated team by phone or email",
  "Consistent quality on repeat orders",
  "Wholesale and trade pricing available",
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.intro,
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: "The Wax Papers" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "142",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "The Wax Papers" },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  // Resolve related product images
  const relatedWithImages = product.related.map((r) => ({
    ...r,
    productData: getProduct(r.href.replace("/", "")),
  }));

  const img2 = product.images[1] ?? product.image;
  const img3 = product.images[2] ?? product.image;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb crumbs={[{ label: product.title }]} />

      {/* ── 1. HERO ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid lg:grid-cols-[1fr_1.05fr] gap-8 items-center">

          {/* Left: copy */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge">Custom Food Paper · UK</span>
              <span className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--color-gold)" }}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                4.8/5 · 142 reviews
              </span>
            </div>
            <h1
              className="font-bold mb-4 leading-tight text-balance"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-charcoal)",
                fontSize: "clamp(1.875rem, 3.5vw, 2.625rem)",
              }}
            >
              {product.h1}
            </h1>
            <p
              className="mb-7"
              style={{
                color: "var(--color-text-muted)",
                fontSize: "1rem",
                lineHeight: "1.8",
                maxWidth: "520px",
              }}
            >
              {product.intro}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-7">
              <Link href="/get-quote" className="btn-primary !text-[0.9375rem] !py-3 !px-6">
                Get a Free Quote
              </Link>
              <Link href="/contact-us" className="btn-secondary !text-[0.9375rem] !py-3 !px-6">
                Talk to Our Team
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5">
              {TRUST_BADGES.map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "var(--color-charcoal-light)" }}
                >
                  <svg className="w-4 h-4 shrink-0" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative overflow-hidden rounded-2xl group" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.13)" }}>
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={760}
              height={560}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ height: "clamp(320px, 42vw, 520px)" }}
              priority
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(45,42,38,0.12) 0%, transparent 60%)" }} />
          </div>
        </div>
      </section>

      {/* ── 2. BENEFITS + USES ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide grid md:grid-cols-2 gap-10">
          <div>
            <div className="gold-bar mb-4" />
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Key Benefits
            </h2>
            <ul className="space-y-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-2.5 items-start">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="gold-bar mb-4" />
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Common Uses
            </h2>
            <ul className="space-y-3">
              {product.uses.map((u) => (
                <li key={u} className="flex gap-2.5 items-start">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-brown)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* CTA after benefits */}
        <div className="container-wide mt-8 flex flex-wrap items-center gap-4">
          <Link href="/get-quote" className="btn-primary !text-sm !py-2.5 !px-5">Get a Free Quote</Link>
          <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>Response within 24 hours · No obligation</span>
        </div>
      </section>

      {/* ── 3. SEO SECTION 1: Content left, Image right ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="gold-bar mb-4" />
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              {product.seoSection1.heading}
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
              {addInternalLinks(product.seoSection1.body, slug)}
            </p>
            <ul className="space-y-2.5">
              {product.seoSection1.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 items-start">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl group" style={{ boxShadow: "0 6px 30px rgba(0,0,0,0.10)" }}>
            <Image
              src={img2}
              alt={`${product.title} — premium branded food paper`}
              width={680}
              height={480}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ height: "clamp(280px, 36vw, 460px)" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── 4. MATERIALS + PRINTING ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Material Options
            </h2>
            <ul className="space-y-2.5">
              {product.materials.map((m) => (
                <li key={m} className="option-card">{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Printing Options
            </h2>
            <ul className="space-y-2.5">
              {product.printingOptions.map((p) => (
                <li key={p} className="option-card">{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. SEO SECTION 2: Image left, Content right ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative overflow-hidden rounded-2xl group order-2 lg:order-1" style={{ boxShadow: "0 6px 30px rgba(0,0,0,0.10)" }}>
            <Image
              src={img3}
              alt={`${product.title} — UK food businesses`}
              width={680}
              height={480}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ height: "clamp(280px, 36vw, 460px)" }}
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="gold-bar mb-4" />
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              {product.seoSection2.heading}
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
              {addInternalLinks(product.seoSection2.body, slug)}
            </p>
            <ul className="space-y-2.5">
              {product.seoSection2.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 items-start">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-brown)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/get-quote" className="btn-primary !text-sm !py-2.5 !px-5">
                Get a Quote for Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SPECIFICATIONS ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            Specifications
          </h2>
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--color-paper)", maxWidth: "860px" }}>
            <table className="spec-table">
              <tbody>
                <tr>
                  <td>Sizes Available</td>
                  <td>{product.sizes}</td>
                </tr>
                <tr>
                  <td>Minimum Order</td>
                  <td>{product.minQty}</td>
                </tr>
                {product.specs.map((s) => (
                  <tr key={s.label}>
                    <td>{s.label}</td>
                    <td>{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/get-quote" className="btn-primary !text-sm !py-2.5 !px-5">Request a Quote</Link>
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>Response within 24 hours · Free digital proof included</span>
          </div>
        </div>
      </section>

      {/* ── 7. WHY BUY ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="container-wide">
          <div className="rounded-2xl p-8" style={{ backgroundColor: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.07)", maxWidth: "860px" }}>
            <div className="gold-bar mb-4" />
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Why Buy From The Wax Papers?
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
              {WHY_POINTS.map((point) => (
                <div key={point} className="flex gap-2.5 items-start">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm" style={{ color: "var(--color-text)" }}>{point}</span>
                </div>
              ))}
            </div>
            <Link href="/get-quote" className="btn-primary !text-sm !py-2.5 !px-5">
              Start Your Order
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide" style={{ maxWidth: "860px" }}>
          <div className="gold-bar mb-4" />
          <h2 className="text-xl font-bold mb-7" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            Frequently Asked Questions
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.07)", padding: "0 1.5rem" }}>
            {product.faqs.map((faq, i) => (
              <details key={i} className="faq-item" open={i < 2 || undefined}>
                <summary>
                  <span>{faq.q}</span>
                  <svg className="faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/contact-us" className="btn-secondary !text-sm !py-2.5 !px-5">
              Have More Questions? Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. INLINE LEAD FORM ── */}
      <section className="py-14" style={{ backgroundColor: "white" }}>
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: persuasive copy */}
          <div>
            <div className="gold-bar mb-4" />
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Get a Free Quote for {product.title}
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Tell us your quantity and requirements — we&apos;ll send a detailed quote within 24 hours. No obligation, no minimum spend to enquire.
            </p>
            <ul className="space-y-3">
              {[
                "Free digital proof with every order",
                "UK-based team — fast, friendly response",
                "Food-safe certified materials and inks",
                "Low minimum order quantities available",
                "Competitive wholesale pricing for bulk orders",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm" style={{ color: "var(--color-text)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: "var(--color-cream)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <ProductLeadForm productName={product.title} />
          </div>
        </div>
      </section>

      {/* ── 10. RELATED PRODUCTS ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="container-wide">
          <div className="gold-bar mb-4" />
          <h2 className="text-xl font-bold mb-7" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedWithImages.map((r) => (
              <Link key={r.href} href={r.href} className="card group block">
                {r.productData && (
                  <div className="overflow-hidden aspect-[4/3]">
                    <Image
                      src={r.productData.image}
                      alt={r.productData.imageAlt}
                      width={300}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-3.5">
                  <h3 className="text-sm font-semibold leading-snug mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
                    {r.label}
                  </h3>
                  <span className="text-xs font-medium inline-flex items-center gap-1" style={{ color: "var(--color-gold)" }}>
                    View product
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ── */}
      <CTASection
        heading={`Order Custom ${product.title} Today`}
        subtext="Send us your size, quantity, and artwork — we respond with a quote within 24 hours. UK-based, food-safe, and ready to print."
      />
    </>
  );
}
