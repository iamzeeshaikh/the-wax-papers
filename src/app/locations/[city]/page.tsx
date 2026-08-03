import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, getLocationBySlug, getNearbyLocations, ukLinkTargets, ukAnchor, ukPick } from "@/lib/locations";
import { getProduct } from "@/lib/products";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `${SITE_URL}/locations/${loc.slug}` },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      url: `${SITE_URL}/locations/${loc.slug}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) notFound();

  const featured = loc.featuredProducts
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const nearby = getNearbyLocations(loc.nearbyCities);

  // Varied internal links — unique product target, anchor, and sentence per city.
  const wlt = ukLinkTargets(loc.slug, 3);
  const WL = wlt.map((s, i) => ({ href: `/${s}`, text: ukAnchor(s, loc.slug, i) }));
  // Varied "choose your paper" grid — different four formats per city page.
  const FMT = ukLinkTargets("fmt-" + loc.slug, 4)
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const answerLine = ukPick([
    { pre: `A go-to for ${loc.city} kitchens is our `, post: `, printed to order and dispatched to keep up with local demand.` },
    { pre: `${loc.city} operators often reach for our `, post: ` first.` },
    { pre: `One of the most-ordered choices in ${loc.city} is our `, post: `.` },
  ], loc.slug, 0);
  const sceneLine = ukPick([
    { pre: `Whatever you serve — from ${loc.signatureDish} to a full weekend menu — the right wrap keeps it sharp. Our `, post: ` fit the way ${loc.city} eats.` },
    { pre: `To match the way ${loc.city} eats, kitchens lean on our `, post: `.` },
    { pre: `Our `, post: ` suit ${loc.city} service from the pass to the customer's hands.` },
  ], loc.slug, 1);
  const industryLine = ukPick([
    { pre: `Not sure which stock suits your menu? Our `, post: ` are a popular starting point.` },
    { pre: `If you're weighing options, start with our `, post: `.` },
    { pre: `A safe first choice for many ${loc.city} menus is our `, post: `.` },
  ], loc.slug, 2);

  // Per-slug heading rotation so no two city pages share identical section
  // headings, on top of each city's unique prose fields.
  const seed = loc.slug.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const pick = (arr: string[], offset = 0) => arr[(seed + offset) % arr.length];

  const answerHeading = pick([
    `Custom Food Papers in ${loc.city}`,
    `Branded Food Paper Supply for ${loc.city}`,
    `Printed Food Wrapping for ${loc.city} Businesses`,
  ]);
  const industriesHeading = pick(
    [
      `Who We Supply in ${loc.city}`,
      `${loc.city} Food Businesses We Print For`,
      `Trades We Serve Across ${loc.city}`,
    ],
    1,
  );
  const whyHeading = pick(
    [
      `Why ${loc.city} Kitchens Choose The Wax Papers`,
      `What Sets Our ${loc.city} Service Apart`,
      `The ${loc.city} Trader’s Packaging Partner`,
    ],
    2,
  );
  const deliveryHeading = pick(
    [
      `Delivery Across ${loc.city} & Beyond`,
      `Getting Your Order to ${loc.city}`,
      `${loc.city} Delivery & Lead Times`,
    ],
    1,
  );

  const faqs = [
    { q: `Do you deliver custom food papers to ${loc.city}?`, a: loc.faqCityAnswer },
    {
      q: `What’s the minimum order for ${loc.city} businesses?`,
      a: `Our minimum order starts low, which keeps custom printing accessible for independent ${loc.city} traders and small kitchens — not just large groups. There are no hidden setup fees on standard orders.`,
    },
    {
      q: `Can I print my logo and brand colours on the paper?`,
      a: `Absolutely. Every order is printed to your artwork — logo, brand colours, or a full-sheet design — using food-safe inks. We send a free digital proof for approval before anything goes to print.`,
    },
    {
      q: `Are your food papers safe for direct food contact?`,
      a: `Yes. All our papers are made from food-safe, grease-resistant materials and printed with food-grade inks suitable for direct contact with hot and cold food, fully compliant with UK regulations.`,
    },
    {
      q: `How long does production and delivery take?`,
      a: `Standard production runs around 7–10 working days after artwork approval, then your order is dispatched to ${loc.city}. If you have an event or opening deadline, tell us and we’ll confirm timings up front.`,
    },
    {
      q: `Do you supply both single sites and multi-site groups in ${loc.city}?`,
      a: `Both. We print to order and store your design for consistent reorders, so whether you run one ${loc.city} site or several, your branding stays identical across every location.`,
    },
    {
      q: `What paper types can ${loc.city} kitchens choose from?`,
      a: `You can choose greaseproof, kraft, deli, burger, sandwich and butcher papers, plus tissue and liners — matched to your food and format. See the full range on our products page or ask us to recommend the right stock for your menu.`,
    },
    {
      q: `Are the papers grease-resistant enough for hot and oily food?`,
      a: `Yes. Our papers resist grease and moisture, so they hold up under burgers, chips, fried food and saucy dishes without soaking through or bleeding the print — ideal for busy ${loc.city} service.`,
    },
    {
      q: `Do you offer both sheets and rolls?`,
      a: `We supply pre-cut sheets in standard and bespoke sizes, plus rolls for wrapping and lining. Tell us your format and we'll quote the option that suits your ${loc.city} operation.`,
    },
    {
      q: `Can you deliver to ${loc.city} for events, pop-ups and markets?`,
      a: `Yes. Many ${loc.city} operators stock up ahead of events, markets and festivals. Share your dates and volume and we'll make sure your branded papers arrive in good time.`,
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Custom Printed Food Papers — ${loc.city}`,
    serviceType: "Custom printed food packaging paper supply",
    description: loc.metaDescription,
    url: `${SITE_URL}/locations/${loc.slug}`,
    provider: { "@type": "Organization", name: "The Wax Papers", url: SITE_URL },
    areaServed: {
      "@type": "City",
      name: loc.city,
      containedInPlace: { "@type": "AdministrativeArea", name: `${loc.county}, ${loc.nation}` },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Custom Food Papers for ${loc.city}`,
      itemListElement: featured.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: p.title, url: `${SITE_URL}/${p.slug}` },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb crumbs={[{ label: "Locations", href: "/locations" }, { label: loc.city }]} />

      {/* ── HERO ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div className="max-w-xl">
            <span className="badge mb-4 inline-block">{loc.county} · {loc.nation}</span>
            <h1
              className="font-bold mb-4 leading-tight text-balance"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.75rem, 3.4vw, 2.4rem)" }}
            >
              {loc.h1}
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-text-muted)" }}>
              {loc.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/get-quote" className="btn-primary text-sm">Get a Free Quote</Link>
              <Link href="/wholesale-wax-paper" className="btn-outline text-sm">Wholesale Pricing</Link>
            </div>
          </div>
          <div className="rounded-xl p-6 border" style={{ backgroundColor: "white", borderColor: "var(--color-paper)" }}>
            <div className="flex items-center gap-2.5 pb-4 mb-4" style={{ borderBottom: "1px solid var(--color-paper)" }}>
              <svg className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-gold-text)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{loc.stat}</span>
            </div>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--color-charcoal)" }}>
              {["Printed to your logo & brand colours", "Food-safe, grease-resistant papers", `Delivered across ${loc.city}`, "Free digital proof · low minimums"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span style={{ color: "var(--color-gold-text)" }} aria-hidden>✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── ANSWER-FIRST ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide max-w-4xl">
          <h2 className="font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>{answerHeading}</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
            The Wax Papers prints custom, food-safe wrapping papers for restaurants, takeaways, cafes and street-food traders across {loc.city} and {loc.county}. Every sheet is produced to your artwork with food-grade inks, so your branding travels with the food from the counter to the customer. {answerLine.pre}
            <Link href={WL[0].href} className="font-semibold underline" style={{ color: "var(--color-brown)" }}>{WL[0].text}</Link>{answerLine.post}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            <strong style={{ color: "var(--color-charcoal)" }}>Key facts:</strong> Low minimum order · Printed to your design · Free digital proof · No setup fees on standard orders · Delivered throughout {loc.city}.
          </p>
        </div>
      </section>

      {/* ── LOCAL SCENE (unique per city) ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
          <div>
            <span className="badge mb-3 inline-block">On the Ground in {loc.city}</span>
            <h2 className="font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>{loc.sceneHeading}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>{loc.localScene}</p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {sceneLine.pre}
              <Link href={WL[1].href} className="font-semibold underline" style={{ color: "var(--color-brown)" }}>{WL[1].text}</Link>{sceneLine.post}
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>Areas We Serve in {loc.city}</h3>
            <div className="flex flex-wrap gap-2">
              {loc.districts.map((d) => (
                <span key={d} className="px-3 py-1.5 rounded-full text-sm border" style={{ backgroundColor: "white", color: "var(--color-charcoal)", borderColor: "var(--color-paper)" }}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide">
          <span className="badge mb-3 inline-block">Who It’s For</span>
          <h2 className="font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>{industriesHeading}</h2>
          <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: "var(--color-text-muted)" }}>
            We print for the full range of {loc.city} food businesses — and match the paper to the job. {industryLine.pre}
            <Link href={WL[2].href} className="font-semibold underline" style={{ color: "var(--color-brown)" }}>{WL[2].text}</Link>{industryLine.post}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {loc.industries.map((ind) => (
              <div key={ind} className="flex items-start gap-2.5 rounded-lg p-4 border" style={{ backgroundColor: "var(--color-cream)", borderColor: "var(--color-paper)", color: "var(--color-charcoal)" }}>
                <span className="font-bold flex-shrink-0" style={{ color: "var(--color-gold-text)" }} aria-hidden>✓</span>
                <span className="text-sm">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAPER FORMATS (navigational) ── */}
      <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide">
          <span className="badge mb-3 inline-block">Choose Your Paper</span>
          <h2 className="font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>Paper Formats for {loc.city} Kitchens</h2>
          <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: "var(--color-text-muted)" }}>
            Match the stock to the job. Every format below is printable with your branding and food-safe for direct contact.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FMT.map((f) => (
              <Link key={f.slug} href={`/${f.slug}`} className="rounded-xl p-5 border block transition-shadow hover:shadow-lg" style={{ backgroundColor: "white", borderColor: "var(--color-paper)" }}>
                <h3 className="font-bold mb-1 text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{f.title}</h3>
                <p className="text-sm mb-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{f.intro.slice(0, 70)}…</p>
                <span className="text-sm font-semibold" style={{ color: "var(--color-gold-text)" }}>Explore {f.title} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS (navigational) ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide">
          <span className="badge mb-3 inline-block">Popular in {loc.city}</span>
          <h2 className="font-bold mb-8" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>Food Papers {loc.city} Businesses Order Most</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="rounded-xl overflow-hidden border block transition-shadow hover:shadow-lg" style={{ backgroundColor: "white", borderColor: "var(--color-paper)" }}>
                <div className="relative w-full h-44">
                  <Image src={p.image} alt={`${p.title} for ${loc.city} food businesses`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1 text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{p.title}</h3>
                  <p className="text-sm mb-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{p.intro.slice(0, 85)}…</p>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-gold-text)" }}>View {p.title} →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/locations" className="text-sm font-semibold underline" style={{ color: "var(--color-brown)" }}>View All UK Delivery Locations →</Link>
          </div>
        </div>
      </section>

      {/* ── REASSURANCE BAND ── */}
      <section className="py-10" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid sm:grid-cols-3 gap-6 text-center">
          {[
            { t: "Food-safe & UK-compliant", d: "Food-grade inks and materials, safe for direct contact." },
            { t: "Free digital proof", d: "Approve your artwork before anything goes to print." },
            { t: "Low minimums, bulk pricing", d: "Accessible for independents, priced for scale." },
          ].map((r) => (
            <div key={r.t}>
              <h3 className="font-bold mb-1 text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{r.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div>
            <span className="badge mb-3 inline-block">Why Us</span>
            <h2 className="font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>{whyHeading}</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>
              Big-brand polish shouldn’t need a big-brand budget. As a UK-based supplier we print to order with food-safe inks, keep minimums low, and store your artwork so reorders match every time — the practical support a busy {loc.city} kitchen actually needs.
            </p>
            <ul className="space-y-2 mb-6 text-sm" style={{ color: "var(--color-charcoal)" }}>
              {["Low minimum orders for independents", "Free digital proof before every print run", "Consistent branding across multiple sites", "Grease-resistant stocks for real service conditions"].map((t) => (
                <li key={t} className="flex items-start gap-2"><span style={{ color: "var(--color-gold-text)" }} aria-hidden>✓</span>{t}</li>
              ))}
            </ul>
            <Link href="/get-quote" className="btn-primary text-sm">Start Your {loc.city} Quote</Link>
          </div>
          <div className="rounded-xl p-6 border" style={{ backgroundColor: "var(--color-cream)", borderColor: "var(--color-paper)" }}>
            <h3 className="font-bold mb-3 text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{deliveryHeading}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{loc.deliveryNote}</p>
          </div>
        </div>
      </section>

      {/* ── NEARBY CITIES (navigational) ── */}
      {nearby.length > 0 && (
        <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
          <div className="container-wide">
            <span className="badge mb-3 inline-block">Also Serving</span>
            <h2 className="font-bold mb-8" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>Custom Food Papers in Nearby Cities</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {nearby.map((n) => (
                <Link key={n.slug} href={`/locations/${n.slug}`} className="rounded-xl p-5 border block transition-shadow hover:shadow-lg" style={{ backgroundColor: "white", borderColor: "var(--color-paper)" }}>
                  <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{n.city}</h3>
                  <p className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>{n.county} · {n.nation}</p>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-gold-text)" }}>Food papers in {n.city} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container-wide grid lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
          <div>
            <span className="badge mb-3 inline-block">FAQs</span>
            <h2 className="font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>{loc.city} Food Paper — FAQs</h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Common questions from {loc.city} food businesses before ordering.</p>
          </div>
          <div style={{ borderTop: "1px solid var(--color-paper)" }}>
            {faqs.map((faq) => (
              <details key={faq.q} className="group" style={{ borderBottom: "1px solid var(--color-paper)" }}>
                <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer font-semibold text-sm list-none" style={{ color: "var(--color-charcoal)" }}>
                  {faq.q}
                  <span className="transition-transform group-open:rotate-45 flex-shrink-0 text-lg" style={{ color: "var(--color-gold-text)" }} aria-hidden>+</span>
                </summary>
                <div className="pb-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={`Ready to Order Custom Food Papers in ${loc.city}?`}
        subtext={`Get a free, no-obligation quote for your ${loc.city} order. We’ll confirm your specifications, review your artwork, and get your branded papers into production quickly.`}
      />
    </>
  );
}
