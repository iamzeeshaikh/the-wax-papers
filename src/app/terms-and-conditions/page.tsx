import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL, SITE_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Wax Papers",
  description: "Terms and conditions for purchasing custom wax paper and food wrapping paper from The Wax Papers, UK.",
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumb crumbs={[{ label: "Terms & Conditions" }]} />
      <section className="py-16" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-narrow">
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-sm mb-10" style={{ color: "var(--color-text-muted)" }}>Last updated: April 2026</p>

          <div className="prose-brand bg-white rounded-2xl p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h2>1. Introduction</h2>
            <p>These terms govern your use of thewaxpapers.co.uk and any purchase of products from The Wax Papers. By placing an order, you agree to these terms in full.</p>

            <h2>2. Orders and Quotes</h2>
            <p>All quotes are valid for 14 days from the date of issue. An order is confirmed only when you have received written acceptance from us and paid the agreed deposit (where applicable). We reserve the right to decline any order.</p>

            <h2>3. Artwork and Proofs</h2>
            <p>You are responsible for the accuracy of all artwork and text submitted. We will provide a digital proof before production. Production begins only after your written proof approval. We accept no liability for errors approved by the customer.</p>

            <h2>4. Pricing and Payment</h2>
            <p>All prices are in GBP and exclude VAT unless stated otherwise. Payment terms are agreed at time of order. Late payments may incur interest at 8% above the Bank of England base rate.</p>

            <h2>5. Production and Lead Times</h2>
            <p>Standard lead time is 7–10 working days from proof approval. Lead times are estimates and may vary. We will notify you of any significant delay. Time is not of the essence unless agreed in writing.</p>

            <h2>6. Delivery</h2>
            <p>Delivery is to the UK address provided at time of order. Risk passes to you on delivery. We are not liable for delays caused by courier services outside our control.</p>

            <h2>7. Returns and Defects</h2>
            <p>Custom-printed products cannot be returned unless they are defective or significantly differ from the approved proof. Claims for defective goods must be made within 7 days of delivery with photographic evidence.</p>

            <h2>8. Intellectual Property</h2>
            <p>You warrant that you have the right to use any artwork, logos, and trademarks submitted. You indemnify us against any third-party IP infringement claims arising from your artwork.</p>

            <h2>9. Limitation of Liability</h2>
            <p>Our total liability for any claim shall not exceed the value of the order in question. We are not liable for indirect or consequential losses.</p>

            <h2>10. Governing Law</h2>
            <p>These terms are governed by English law. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

            <h2>11. Contact</h2>
            <p>For any queries regarding these terms, contact us at <a href={`mailto:${SITE_EMAIL}`} style={{ color: "var(--color-gold)" }}>{SITE_EMAIL}</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
