import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL, SITE_PHONE, SITE_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Free Quote | Custom Wax Paper UK",
  description: "Request a free quote for custom wax paper, printed greaseproof paper, or any food wrapping paper. UK supplier — response within 24 hours.",
  alternates: { canonical: `${SITE_URL}/get-quote` },
};

export default function GetQuotePage() {
  return (
    <>
      <Breadcrumb crumbs={[{ label: "Get a Free Quote" }]} />
      <section className="py-16" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <QuoteForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
                Contact Us Directly
              </h2>
              <div className="space-y-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "var(--color-charcoal)" }}>Phone</p>
                  <a href={`tel:${SITE_PHONE}`} className="hover:underline" style={{ color: "var(--color-gold)" }}>{SITE_PHONE}</a>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "var(--color-charcoal)" }}>Email</p>
                  <a href={`mailto:${SITE_EMAIL}`} className="hover:underline" style={{ color: "var(--color-gold)" }}>{SITE_EMAIL}</a>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "var(--color-charcoal)" }}>Address</p>
                  <address className="not-italic">7 Greys Court, Kingsland Grange,<br />Warrington, WA1 4SH, UK</address>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
                What Happens Next?
              </h2>
              <ol className="space-y-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {["We review your requirements within 24 hours", "Our team prepares a detailed quote", "We send a free digital proof if artwork is provided", "You confirm the order and we go to print"].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center shrink-0 font-bold" style={{ backgroundColor: "var(--color-gold)" }}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--color-gold-pale)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-brown)" }}>Accepted artwork formats</p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>PDF · AI · EPS · PNG (300 dpi min)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
