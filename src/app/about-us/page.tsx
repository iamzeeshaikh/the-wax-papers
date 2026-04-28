import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | The Wax Papers — UK Food Paper Supplier",
  description: "Learn about The Wax Papers — a UK-based supplier of custom wax paper, greaseproof paper, and branded food wrapping paper based in Warrington.",
  alternates: { canonical: `${SITE_URL}/about-us` },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb crumbs={[{ label: "About Us" }]} />

      {/* Intro */}
      <section className="py-16" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="badge mb-4">About Us</span>
            <h1 className="text-4xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              The UK&apos;s Specialist in Custom Food Paper & Wax Paper
            </h1>
            <p className="mb-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              The Wax Papers is a UK-based supplier of custom wax paper, printed greaseproof paper, and branded food wrapping paper. We work with food businesses of all sizes — from independent market traders to multi-site restaurant groups — supplying food-safe, custom-printed paper that makes every product look the part.
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Based in Warrington, we supply nationwide across England, Scotland, and Wales. Our team understands the UK food industry — the pressures, the pace, and the importance of packaging that works reliably every time.
            </p>
            <Link href="/get-quote" className="btn-primary">Get a Free Quote</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/images/greaseproof-paper/Custom Greaseproof Paper -TCB-1.png", alt: "Custom greaseproof paper UK" },
              { src: "/images/burger-paper/custom burger paper-TCB-1.png", alt: "Custom burger paper UK" },
              { src: "/images/kraft-paper/Custom kraft Paper-TCB-1.png", alt: "Custom kraft paper UK" },
              { src: "/images/cheese-paper/Custom Cheese Paper-TCB-1.png", alt: "Custom cheese paper UK" },
            ].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl" style={{ marginTop: i % 2 === 1 ? "1.5rem" : 0 }}>
                <Image src={img.src} alt={img.alt} width={300} height={260} className="w-full h-44 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ backgroundColor: "var(--color-cream-light)" }}>
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Food Safety First", desc: "Every paper we supply is food-contact certified. We only use food-safe inks, coatings, and materials — no exceptions." },
              { title: "UK Expertise", desc: "We know the British food industry. Our team provides practical advice, not just products, to help your business get the most from its packaging." },
              { title: "Accessible Custom Print", desc: "We make custom printing accessible with low minimums. Small businesses deserve quality branded packaging too." },
              { title: "Reliable Supply", desc: "Consistent quality, consistent lead times. We maintain production specs so repeat orders match your first order exactly." },
              { title: "Honest Pricing", desc: "Clear pricing with no hidden extras. Volume discounts are transparent and straightforward." },
              { title: "Responsive Service", desc: "When you get in touch, you speak to people who know food paper. We respond to enquiries within 24 hours." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div className="gold-bar mb-4" />
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16" style={{ backgroundColor: "white" }}>
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            Based in Warrington, Serving the UK
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Our address is 7 Greys Court, Kingsland Grange, Warrington, WA1 4SH. We supply food paper and wax paper packaging to businesses across the United Kingdom with reliable, trackable delivery.
          </p>
          <Link href="/contact-us" className="btn-primary">Get in Touch</Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
