import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL, SITE_PHONE, SITE_EMAIL, SITE_ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | The Wax Papers — UK Food Paper Supplier",
  description: "Contact The Wax Papers for custom wax paper, greaseproof paper, and food wrapping paper enquiries. UK-based team — we respond within 24 hours.",
  alternates: { canonical: `${SITE_URL}/contact-us` },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact The Wax Papers",
  url: `${SITE_URL}/contact-us`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: "The Wax Papers",
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 Greys Court, Kingsland Grange",
      addressLocality: "Warrington",
      postalCode: "WA1 4SH",
      addressCountry: "GB",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <Breadcrumb crumbs={[{ label: "Contact Us" }]} />

      <section className="py-16" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid lg:grid-cols-2 gap-14">
          {/* Info */}
          <div>
            <span className="badge mb-4">Get in Touch</span>
            <h1 className="text-4xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Contact The Wax Papers
            </h1>
            <p className="mb-8 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Whether you have a specific requirement, need a quote, or want to know more about our products — our UK team is here to help. We aim to respond to all enquiries within 24 hours.
            </p>

            <div className="space-y-6">
              {[
                { label: "Phone", value: SITE_PHONE, href: `tel:${SITE_PHONE}` },
                { label: "Email", value: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
              ].map((c) => (
                <div key={c.label} className="bg-white rounded-xl p-5" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-gold)" }}>{c.label}</p>
                  <a href={c.href} className="text-lg font-semibold hover:underline" style={{ color: "var(--color-charcoal)" }}>{c.value}</a>
                </div>
              ))}
              <div className="bg-white rounded-xl p-5" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-gold)" }}>Address</p>
                <address className="not-italic text-base" style={{ color: "var(--color-charcoal)" }}>{SITE_ADDRESS}</address>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/get-quote" className="btn-primary">Request a Free Quote</Link>
            </div>
          </div>

          {/* Simple contact form */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
              Send Us a Message
            </h2>
            <form className="space-y-5" action="mailto:Info@thewaxpapers.co.uk" method="get" encType="text/plain">
              <div>
                <label className="form-label" htmlFor="c-name">Name</label>
                <input id="c-name" name="name" type="text" className="form-input" placeholder="Your name" />
              </div>
              <div>
                <label className="form-label" htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" className="form-input" placeholder="your@email.co.uk" />
              </div>
              <div>
                <label className="form-label" htmlFor="c-subject">Subject</label>
                <input id="c-subject" name="subject" type="text" className="form-input" placeholder="How can we help?" />
              </div>
              <div>
                <label className="form-label" htmlFor="c-message">Message</label>
                <textarea id="c-message" name="body" rows={5} className="form-input resize-none" placeholder="Tell us about your requirements…" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
