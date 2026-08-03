import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/lib/locations";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "UK Delivery Locations",
  description:
    "We deliver custom printed food papers to food businesses across the UK — London, Manchester, Birmingham, Glasgow, Cardiff, Belfast and more. Find your city.",
  alternates: { canonical: `${SITE_URL}/locations` },
};

const NATIONS = ["England", "Scotland", "Wales", "Northern Ireland"] as const;

export default function LocationsHubPage() {
  const byNation = NATIONS.map((nation) => ({
    nation,
    cities: locations.filter((l) => l.nation === nation),
  })).filter((g) => g.cities.length > 0);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UK Delivery Locations — The Wax Papers",
    itemListElement: locations.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Custom Food Papers in ${l.city}`,
      url: `${SITE_URL}/locations/${l.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Breadcrumb crumbs={[{ label: "Locations" }]} />

      {/* Hero */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide max-w-3xl">
          <span className="badge mb-4 inline-block">UK Delivery</span>
          <h1 className="font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
            Custom Food Papers Delivered Across the UK
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            From London street-food markets to Glasgow’s late-night counters, we print branded, food-safe
            wrapping papers for food businesses in every corner of the UK. Choose your city to see how we
            supply your area — or{" "}
            <Link href="/get-quote" className="font-semibold underline" style={{ color: "var(--color-brown)" }}>get a free quote</Link>{" "}
            to get started.
          </p>
        </div>
      </section>

      {/* Cities by nation */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide space-y-10">
          {byNation.map((group) => (
            <div key={group.nation}>
              <h2 className="font-bold text-xl mb-5 pb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", borderBottom: "2px solid var(--color-paper)" }}>
                {group.nation}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.cities.map((c) => (
                  <Link key={c.slug} href={`/locations/${c.slug}`} className="rounded-xl p-5 border block transition-shadow hover:shadow-lg" style={{ backgroundColor: "var(--color-cream)", borderColor: "var(--color-paper)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-gold-text)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{c.city}</h3>
                    </div>
                    <p className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>{c.county}</p>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-gold-text)" }}>Food papers in {c.city} →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="Don’t See Your City?"
        subtext="We deliver custom food papers right across the UK — not just the cities listed here. Tell us where you’re based and what you serve, and we’ll get you a free quote."
      />
    </>
  );
}
