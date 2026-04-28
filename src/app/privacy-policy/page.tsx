import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL, SITE_NAME, SITE_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | The Wax Papers",
  description: "Privacy policy for The Wax Papers — how we collect, use, and protect your personal data in line with UK GDPR.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb crumbs={[{ label: "Privacy Policy" }]} />
      <section className="py-16" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-narrow">
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mb-10" style={{ color: "var(--color-text-muted)" }}>Last updated: April 2026</p>

          <div className="prose-brand bg-white rounded-2xl p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h2>Who We Are</h2>
            <p>{SITE_NAME} is a UK-based supplier of custom wax paper and food wrapping paper, operating from 7 Greys Court, Kingsland Grange, Warrington, WA1 4SH. We are the data controller for any personal data collected through this website.</p>

            <h2>What Data We Collect</h2>
            <p>When you use our quote form or contact form, we may collect:</p>
            <ul>
              <li>Your name and business name</li>
              <li>Email address and phone number</li>
              <li>Order details, product preferences, and any artwork you upload</li>
              <li>Technical data such as your IP address and browser type (collected automatically)</li>
            </ul>

            <h2>How We Use Your Data</h2>
            <p>We use your personal data to:</p>
            <ul>
              <li>Respond to your quote requests and enquiries</li>
              <li>Process and fulfil orders</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not sell your personal data to third parties. We do not use it for unsolicited marketing without your consent.</p>

            <h2>Legal Basis for Processing</h2>
            <p>We process your data on the basis of legitimate interests (responding to enquiries) and, where applicable, contract performance (processing your order). Where required, we will seek your explicit consent.</p>

            <h2>Data Retention</h2>
            <p>We retain enquiry and order records for up to 6 years in line with UK tax and business record requirements. You may request deletion of your data at any time, subject to legal retention obligations.</p>

            <h2>Your Rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Lodge a complaint with the ICO (ico.org.uk)</li>
            </ul>

            <h2>Cookies</h2>
            <p>This website may use essential cookies to ensure basic functionality. No third-party tracking or advertising cookies are used without your consent.</p>

            <h2>Contact</h2>
            <p>For any data-related requests or queries, contact us at <a href={`mailto:${SITE_EMAIL}`} style={{ color: "var(--color-gold)" }}>{SITE_EMAIL}</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
