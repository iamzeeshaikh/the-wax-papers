import type { Metadata } from "next";
import Link from "next/link";

import { SITE_EMAIL, SITE_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank you — your request is with us",
  description:
    "Your custom wax paper request has been received. Our UK team replies with pricing and options within 24 hours.",
  robots: { index: false, follow: true },
};

const steps = [
  "We review your size, material and quantity.",
  "You get a written price with printing and finishing options.",
  "We send a free digital proof before anything prints.",
];

export default function ThankYouPage() {
  return (
    <section className="py-16" style={{ backgroundColor: "var(--color-cream-light)" }}>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--color-gold-pale)" }}
        >
          <svg
            className="w-8 h-8"
            style={{ color: "var(--color-gold-text)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Thank you — we have your request</h1>
        <p className="mb-8" style={{ color: "var(--color-text-muted)" }}>
          Your details are with our team. We reply with pricing, material options and lead time
          within 24 hours, and sooner during UK business hours.
        </p>

        <ol
          className="grid gap-3 text-left rounded-xl p-6 mb-8"
          style={{ backgroundColor: "var(--color-white)", border: "1px solid var(--color-paper)" }}
        >
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "var(--color-brown-dark)" }}
              >
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/custom-wax-paper" className="btn-secondary">
            Browse products
          </Link>
        </div>

        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Need it sooner? Call{" "}
          <a href={`tel:${SITE_PHONE}`} style={{ color: "var(--color-gold-text)", fontWeight: 600 }}>
            {SITE_PHONE}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${SITE_EMAIL}`} style={{ color: "var(--color-gold-text)", fontWeight: 600 }}>
            {SITE_EMAIL}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
