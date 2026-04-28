import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_PHONE, SITE_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Custom Wax Paper Packaging UK | ${SITE_NAME}`,
  description:
    "UK supplier of custom wax paper, printed greaseproof paper, and branded food wrapping paper. Low minimum orders, fast turnaround, food-safe materials.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `Custom Wax Paper Packaging UK | ${SITE_NAME}`,
    description:
      "UK supplier of custom wax paper, printed greaseproof paper, and branded food wrapping paper. Low minimum orders, fast turnaround, food-safe materials.",
    url: SITE_URL,
  },
};

const PRODUCT_GRID = [
  {
    label: "Greaseproof Paper",
    href: "/greaseproof-paper",
    img: "/images/greaseproof-paper/Custom Greaseproof Paper -TCB-1.png",
    alt: "Custom printed greaseproof paper sheets",
  },
  {
    label: "Burger Wrapping Paper",
    href: "/burger-wrapping-paper",
    img: "/images/burger-paper/custom burger paper-TCB-1.png",
    alt: "Custom burger wrapping paper UK",
  },
  {
    label: "Sandwich Paper",
    href: "/sandwich-wrapping-paper",
    img: "/images/sandwich-paper/Custom Sandwich Paper-TPB-1.png",
    alt: "Custom sandwich wrapping paper",
  },
  {
    label: "Deli Paper",
    href: "/deli-paper",
    img: "/images/deli-paper/Deli paper-PBEE-1.png",
    alt: "Custom deli paper for food businesses",
  },
  {
    label: "Kraft Wax Paper",
    href: "/kraft-wax-paper",
    img: "/images/kraft-paper/Custom kraft Paper-TCB-1.png",
    alt: "Custom kraft wax paper UK",
  },
  {
    label: "Cheese Wrapping Paper",
    href: "/cheese-wrapping-paper",
    img: "/images/cheese-paper/Custom Cheese Paper-TCB-1.png",
    alt: "Custom cheese wrapping paper",
  },
  {
    label: "Butcher Paper",
    href: "/butcher-paper",
    img: "/images/butcher-paper/custom butcher paper-PBEE-1.png",
    alt: "Custom butcher paper for meat",
  },
  {
    label: "Bakery Wrapping Paper",
    href: "/bakery-wrapping-paper",
    img: "/images/parchment-paper/parchment paper-PBEE-1.png",
    alt: "Custom bakery wrapping paper",
  },
  {
    label: "Custom Wax Paper",
    href: "/custom-wax-paper",
    img: "/images/freezer-paper/Custom Freezer Paper-TCB-1.png",
    alt: "Custom printed wax paper UK",
  },
  {
    label: "Food Wrapping Paper",
    href: "/food-wrapping-paper",
    img: "/images/food-paper/custom food paper-TCB-1.png",
    alt: "Custom food wrapping paper",
  },
  {
    label: "Christmas Wax Paper",
    href: "/christmas-wax-paper",
    img: "/images/christmas-paper/christmas wrapping paper-PBEE-1.png",
    alt: "Christmas themed wax paper UK",
  },
  {
    label: "Wholesale Wax Paper",
    href: "/wholesale-wax-paper",
    img: "/images/fry-paper/Custom Fry Paper-TCB-1.png",
    alt: "Wholesale wax paper UK supplier",
  },
];

const WHY_US = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8L3 21" />
      </svg>
    ),
    title: "UK-Based Supplier",
    body: "We operate from Warrington, UK — shipping across England, Scotland, and Wales with reliable lead times.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Food-Safe Materials",
    body: "All our papers are food-contact certified — greaseproof, wax-coated, and kraft options that meet UK food safety standards.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Full Custom Printing",
    body: "Your logo, brand colours, and artwork printed precisely. From single-colour stamps to full-colour designs — we handle it all.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast Turnaround",
    body: "Standard orders dispatched within 7–10 working days. Rush options available for time-sensitive requirements.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Low Minimum Orders",
    body: "No need to order thousands of sheets to get started. We support small businesses and large food chains alike.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Eco-Friendly Options",
    body: "We stock recyclable and compostable greaseproof papers that help your brand meet its sustainability commitments.",
  },
];

const INDUSTRIES = [
  { name: "Restaurants & Takeaways", icon: "🍔" },
  { name: "Bakeries & Patisseries", icon: "🥐" },
  { name: "Delis & Sandwich Shops", icon: "🥪" },
  { name: "Butchers & Fishmongers", icon: "🔪" },
  { name: "Cheese & Charcuterie", icon: "🧀" },
  { name: "Cafés & Coffee Shops", icon: "☕" },
  { name: "Food Manufacturers", icon: "🏭" },
  { name: "Farmers Markets", icon: "🌿" },
];

const MATERIALS = [
  {
    name: "Wax Paper",
    desc: "A wax-coated paper ideal for wrapping deli items, sandwiches, and bakery goods. Moisture-resistant and grease-resistant.",
    tag: "Most Popular",
  },
  {
    name: "Greaseproof Paper",
    desc: "Smooth, dense paper that resists grease without any coating. Widely used in bakeries and fish & chip shops across the UK.",
    tag: "Bakery Favourite",
  },
  {
    name: "Kraft Paper",
    desc: "Strong, natural brown paper with a rustic look. Unbleached and eco-friendly — ideal for butchers and artisan food brands.",
    tag: "Eco Choice",
  },
  {
    name: "Printed Tissue Paper",
    desc: "Lightweight, soft tissue paper printed with your branding. Popular for gifting, boutique food packaging, and cheese boards.",
    tag: "Premium Feel",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Request a Quote", desc: "Fill in our simple quote form with your product type, quantity, size, and artwork details." },
  { step: "02", title: "Approve Your Artwork", desc: "Our team creates a free digital proof. You approve the design before anything goes to print." },
  { step: "03", title: "We Print & Check", desc: "Your order is printed on food-safe paper, quality-checked, and carefully packed for dispatch." },
  { step: "04", title: "Delivered to Your Door", desc: "Fast UK delivery to your business address. Bulk orders are palletised and delivered safely." },
];

const FAQS = [
  {
    q: "What is the minimum order quantity for custom wax paper?",
    a: "Our minimum order quantities vary by product and printing method, but we work with businesses of all sizes. Contact us for a quote tailored to your quantity — we cater for both small independent businesses and large wholesale orders.",
  },
  {
    q: "Can I get a sample before placing a full order?",
    a: "Yes. We can provide material samples so you can assess the paper weight, finish, and print quality before committing to a full order. Get in touch with our team to request samples.",
  },
  {
    q: "What file format should I send for my artwork?",
    a: "We accept PDF, AI, EPS, and high-resolution PNG files (300 dpi minimum). If you don't have print-ready artwork, our design team can assist you for a small fee.",
  },
  {
    q: "Do your papers comply with UK food safety regulations?",
    a: "Yes. All papers we supply are food-contact certified and comply with relevant UK and EU food safety standards. We only use food-safe inks and coatings.",
  },
  {
    q: "How long does production and delivery take?",
    a: "Standard lead time is 7–10 working days from artwork approval. Rush orders may be available — contact us to discuss your deadline and we will do our best to accommodate.",
  },
  {
    q: "Do you offer eco-friendly or compostable paper options?",
    a: "Yes. We stock uncoated greaseproof paper, unbleached kraft paper, and compostable wax paper options. These are ideal for businesses looking to reduce their environmental impact.",
  },
  {
    q: "Can I order wax paper in both sheet and roll formats?",
    a: "Absolutely. We supply both pre-cut sheets and continuous rolls. Sheets suit manual wrapping and deli counters; rolls are better for high-volume wrapping stations and dispensers.",
  },
  {
    q: "Do you offer wholesale pricing for large orders?",
    a: "Yes. We offer competitive wholesale pricing for large volume orders. The more you order, the lower your cost per unit. Contact us for a bulk pricing quote.",
  },
];

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "The Wax Papers",
  url: "https://thewaxpapers.co.uk",
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "7 Greys Court, Kingsland Grange",
    addressLocality: "Warrington",
    postalCode: "WA1 4SH",
    addressCountry: "GB",
  },
  description:
    "UK-based supplier of custom wax paper, printed greaseproof paper, and branded food wrapping paper for restaurants, bakeries, delis, and food businesses.",
  areaServed: "GB",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Wax Papers",
  url: "https://thewaxpapers.co.uk",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://thewaxpapers.co.uk/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ── HERO ── */}
      <section
        aria-label="Hero"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brown-dark) 0%, #2d1f0f 60%, #1a110a 100%)",
        }}
      >
        <div className="container-wide grid lg:grid-cols-2 gap-10 items-center py-20 lg:py-28">
          {/* Copy */}
          <div>
            <span className="badge mb-5 inline-block">UK Food Paper Specialist</span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Custom Wax Paper Packaging in the UK
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Branded greaseproof paper, printed wax paper, and custom food wrapping paper — made for restaurants, bakeries, delis, and food businesses across the UK.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/get-quote" className="btn-primary text-base">
                Get a Free Quote
              </Link>
              <Link
                href="#products"
                className="btn-secondary !border-white/40 !text-white hover:!bg-white/10 hover:!text-white text-base"
              >
                View Products
              </Link>
              <Link
                href="/get-quote"
                className="btn-outline-gold text-base"
              >
                Upload Artwork
              </Link>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 text-sm text-white/55">
              {["Food-Safe Certified", "UK-Based Supplier", "Low Minimums", "Fast Dispatch"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/greaseproof-paper/Custom Greaseproof Paper -TCB-1.png", alt: "Custom printed greaseproof paper" },
                { src: "/images/burger-paper/custom burger paper-TCB-1.png", alt: "Custom burger wrapping paper" },
                { src: "/images/sandwich-paper/Custom Sandwich Paper-TPB-1.png", alt: "Custom sandwich paper" },
                { src: "/images/kraft-paper/Custom kraft Paper-TCB-1.png", alt: "Custom kraft paper" },
              ].map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    marginTop: i % 2 === 1 ? "2rem" : "0",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={300}
                    height={280}
                    className="w-full h-48 object-cover"
                    priority={i < 2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORY GRID ── */}
      <section id="products" className="py-20" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge mb-3">All Products</span>
            <h2 className="section-title">Our Custom Paper Products</h2>
            <p className="section-subtitle mx-auto text-center">
              Every product is available with full custom printing. Choose your paper type, size, and let us handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {PRODUCT_GRID.map((product) => (
              <Link key={product.href} href={product.href} className="card group block">
                <div className="overflow-hidden aspect-[4/3]">
                  <Image
                    src={product.img}
                    alt={product.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold text-sm leading-snug"
                    style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-heading)" }}
                  >
                    {product.label}
                  </h3>
                  <span
                    className="text-xs mt-1 inline-flex items-center gap-1 font-medium"
                    style={{ color: "var(--color-gold)" }}
                  >
                    View product
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/get-quote" className="btn-primary">
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-cream-light)" }}
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge mb-3">Why Us</span>
            <h2 className="section-title">Why Food Businesses Choose The Wax Papers</h2>
            <p className="section-subtitle mx-auto text-center">
              We supply custom food paper to independent cafés, national restaurant groups, artisan bakeries, and wholesale buyers across the UK.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "var(--color-gold-pale)",
                    color: "var(--color-gold)",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM PRINTING OPTIONS ── */}
      <section className="py-20" style={{ backgroundColor: "white" }}>
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="badge mb-4">Custom Printing</span>
            <h2 className="section-title mb-4">Your Brand, On Every Sheet</h2>
            <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>
              We print your logo, artwork, and brand messaging directly onto food-safe paper. Whether you need a single repeat pattern or a detailed branded design, we have a printing method to match your brief.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Single-Colour Print", desc: "Cost-effective option for logos and simple designs. Sharp results on greaseproof and wax paper." },
                { title: "Full-Colour Print", desc: "Vibrant CMYK printing for complex artwork, photography, and multi-colour brand designs." },
                { title: "Natural Kraft Print", desc: "Brown kraft paper with your design — a sustainable, premium look that food brands love." },
              ].map((opt) => (
                <li key={opt.title} className="flex gap-4">
                  <div
                    className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-gold)", color: "white" }}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong style={{ color: "var(--color-charcoal)" }}>{opt.title}</strong>
                    <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>{opt.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/get-quote" className="btn-primary">
                Start Your Custom Order
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/images/hot-paper/Custom Hot Paper-TCB-1.png", alt: "Custom branded hot paper" },
              { src: "/images/heat-seal-paper/Custom Heat Seal Paper-TCB-1.png", alt: "Custom heat seal paper printing" },
              { src: "/images/wrapping-paper/custom wrapping paper-PBEE-1.png", alt: "Custom printed wrapping paper" },
              { src: "/images/glassine-paper/glassine paper-TCB-1.png", alt: "Glassine paper with custom print" },
            ].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={280}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge mb-3">Industries We Serve</span>
            <h2 className="section-title">Food Businesses We Work With</h2>
            <p className="section-subtitle mx-auto text-center">
              From independent market stalls to multi-site restaurant groups — we supply branded food paper to businesses at every scale.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                className="bg-white rounded-xl p-5 flex flex-col items-center text-center gap-3"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                <span className="text-3xl">{ind.icon}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {ind.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS & FINISHES ── */}
      <section className="py-20" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge mb-3">Materials</span>
            <h2 className="section-title">Paper Types &amp; Finishes</h2>
            <p className="section-subtitle mx-auto text-center">
              We stock a full range of food-safe paper materials, each suited to different products and presentation styles.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIALS.map((mat) => (
              <div
                key={mat.name}
                className="bg-white rounded-xl p-6 relative"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
              >
                <span
                  className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-gold-pale)",
                    color: "var(--color-brown)",
                  }}
                >
                  {mat.tag}
                </span>
                <div
                  className="w-10 h-1 rounded mb-4"
                  style={{ backgroundColor: "var(--color-gold)" }}
                />
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}
                >
                  {mat.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {mat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ORDERING WORKS ── */}
      <section className="py-20" style={{ backgroundColor: "white" }}>
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="badge mb-3">The Process</span>
            <h2 className="section-title">How Ordering Works</h2>
            <p className="section-subtitle mx-auto text-center">
              A straightforward process from first contact to delivery — no jargon, no hidden steps.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] w-full h-px"
                    style={{ backgroundColor: "var(--color-paper)" }}
                  />
                )}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-5 relative z-10"
                  style={{
                    backgroundColor: "var(--color-gold)",
                    color: "white",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {step.step}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/get-quote" className="btn-primary">
              Start Your Order
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge mb-3">Featured</span>
            <h2 className="section-title">Most Popular Products</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Printed Greaseproof Paper",
                desc: "The most popular choice for UK bakeries, cafés, and fish & chip shops. Grease-resistant, food-safe, and fully printable with your branding.",
                href: "/printed-greaseproof-paper",
                img: "/images/fish-chip-paper/Custom Fish and Chip Paper-TCB-1.png",
                alt: "Custom printed greaseproof paper UK",
              },
              {
                title: "Custom Burger Wrapping Paper",
                desc: "Keep burgers hot and branded. Our wax-coated burger papers are grease-proof, moisture-resistant, and available in any size.",
                href: "/custom-burger-paper",
                img: "/images/burger-paper/burger wrapping paper-PBEE-1.png",
                alt: "Custom burger wrapping paper",
              },
              {
                title: "Custom Deli Paper",
                desc: "Perfect for wrapping sandwiches, subs, and deli counter products. Available in white, kraft, and custom printed finishes.",
                href: "/custom-deli-paper",
                img: "/images/deli-paper/Deli paper-PBEE-1.png",
                alt: "Custom deli paper for delis and sandwich shops",
              },
            ].map((p) => (
              <div key={p.href} className="card group">
                <div className="overflow-hidden aspect-[16/10]">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    width={500}
                    height={310}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
                    {p.desc}
                  </p>
                  <Link
                    href={p.href}
                    className="text-sm font-semibold inline-flex items-center gap-1"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UK SUPPLIER SECTION ── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, var(--color-brown-dark) 0%, var(--color-brown) 100%)",
        }}
      >
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-4 inline-block"
              style={{ color: "var(--color-gold-light)" }}
            >
              UK Packaging Supplier
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Serving Food Businesses Across the United Kingdom
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Based in Warrington, we supply custom wax paper and printed food paper to restaurants, bakeries, delis, and food manufacturers throughout England, Scotland, and Wales. Our UK base means faster delivery, local expertise, and a team that understands British food businesses.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Nationwide UK delivery",
                "Dedicated account management",
                "UK-compliant food-contact materials",
                "Artwork support and design service",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-white/80 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-gold-light)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/about-us" className="btn-outline-gold">
              About The Wax Papers
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/images/cheese-paper/Custom Cheese Paper-TCB-1.png", alt: "Custom cheese wrapping paper UK" },
              { src: "/images/butcher-paper/custom butcher paper-PBEE-1.png", alt: "Custom butcher paper UK" },
              { src: "/images/parchment-paper/parchment paper-PBEE-1.png", alt: "Custom bakery parchment paper UK" },
              { src: "/images/taco-paper/Custom taco Paper-TCB-1.png", alt: "Custom food wrapping paper UK" },
            ].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl" style={{ marginTop: i % 2 === 1 ? "1.5rem" : 0 }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={260}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHOLESALE SECTION ── */}
      <section className="py-20" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-2xl" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
            <Image
              src="/images/fry-paper/Custom Fry Paper-TCB-1.png"
              alt="Wholesale wax paper and food paper UK supplier"
              width={640}
              height={480}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <span className="badge mb-4">Bulk &amp; Wholesale</span>
            <h2 className="section-title mb-4">Wholesale Wax Paper for High-Volume Buyers</h2>
            <p className="mb-5" style={{ color: "var(--color-text-muted)" }}>
              Whether you manage a restaurant group, run a food manufacturing facility, or distribute packaging to other businesses, we offer competitive wholesale pricing with reliable supply.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { label: "Volume discounts", desc: "Lower unit cost as quantities increase" },
                { label: "Consistent supply", desc: "Repeat orders fulfilled to the same spec" },
                { label: "Palletised delivery", desc: "Bulk orders packed and delivered safely" },
                { label: "Trade accounts", desc: "Credit terms available for regular buyers" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-lg p-4"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  <strong
                    className="text-sm block mb-1"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {item.label}
                  </strong>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/wholesale-wax-paper" className="btn-primary">
              Wholesale Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST & STATS ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-charcoal)" }}
      >
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { stat: "30+", label: "Paper Products" },
              { stat: "100%", label: "Food-Safe Certified" },
              { stat: "7–10", label: "Day Turnaround" },
              { stat: "UK", label: "Based &amp; Delivered" },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="text-4xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-gold)",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.stat }}
                />
                <p
                  className="text-sm font-medium uppercase tracking-wide"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="badge mb-3">FAQs</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto text-center">
              Everything you need to know about ordering custom wax paper and food packaging from us.
            </p>
          </div>

          <div
            className="bg-white rounded-2xl px-6 py-2"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
          >
            {FAQS.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
                    style={{ color: "var(--color-gold)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQS.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #1a110a 0%, var(--color-brown-dark) 50%, var(--color-brown) 100%)",
        }}
      >
        <div className="container-narrow text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get Custom Wax Paper Printed for Your Business
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Send us your artwork and requirements — our team will come back with a quote within 24 hours. No obligation, no pressure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-quote" className="btn-primary text-base !py-4 !px-8">
              Get Your Free Quote
            </Link>
            <Link href="/contact-us" className="btn-outline-gold text-base !py-4 !px-8">
              Talk to Our Team
            </Link>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            Based in Warrington, UK · Fast Nationwide Delivery · Food-Safe Certified
          </p>
        </div>
      </section>
    </>
  );
}
