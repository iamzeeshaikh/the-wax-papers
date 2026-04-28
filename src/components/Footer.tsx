import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_ADDRESS,
  FOOTER_QUICK_LINKS,
  FOOTER_LEGAL_LINKS,
} from "@/lib/constants";

const KEY_PRODUCTS_COL1 = [
  { label: "Custom Wax Paper", href: "/custom-wax-paper" },
  { label: "Greaseproof Paper", href: "/greaseproof-paper" },
  { label: "Burger Wrapping Paper", href: "/burger-wrapping-paper" },
  { label: "Sandwich Paper", href: "/sandwich-wrapping-paper" },
];

const KEY_PRODUCTS_COL2 = [
  { label: "Deli Paper", href: "/deli-paper" },
  { label: "Bakery Paper", href: "/bakery-wrapping-paper" },
  { label: "Butcher Paper", href: "/butcher-paper" },
  { label: "Wholesale Wax Paper", href: "/wholesale-wax-paper" },
];

const WHY_ITEMS = [
  "UK-based packaging supplier",
  "Custom printing from low quantities",
  "Food-safe certified materials",
  "Fast turnaround times",
  "Greaseproof & wax paper specialists",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" style={{ backgroundColor: "#38322c" }}>

      {/* Main grid */}
      <div className="py-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container-wide grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand + contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <Image
                src="/logo-icon.svg"
                alt="The Wax Papers logo"
                width={20}
                height={25}
              />
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-gold)" }}
              >
                The Wax Papers
              </span>
            </Link>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.62)" }}>
              UK-based supplier of custom wax paper, printed greaseproof paper, and branded food wrapping paper for businesses of all sizes.
            </p>
            <address className="not-italic space-y-1.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              <p>{SITE_ADDRESS}</p>
              <p>
                <a href={`tel:${SITE_PHONE}`} className="footer-link">{SITE_PHONE}</a>
              </p>
              <p>
                <a href={`mailto:${SITE_EMAIL}`} className="footer-link">{SITE_EMAIL}</a>
              </p>
            </address>
          </div>

          {/* Products — 2 sub-columns */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              Products
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
              <ul className="space-y-1.5">
                {KEY_PRODUCTS_COL1.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-xs">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-1.5">
                {KEY_PRODUCTS_COL2.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-xs">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/sitemap-page"
              className="inline-block mt-3 text-xs transition-colors"
              style={{ color: "var(--color-gold-light)" }}
            >
              View all products →
            </Link>
          </div>

          {/* Quick links + Legal */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

            <ul className="space-y-1.5">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link-dim text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why us */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              Why Choose Us
            </h3>
            <ul className="space-y-2 mb-5">
              {WHY_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.62)" }}>
                  <svg
                    className="w-3.5 h-3.5 mt-px shrink-0"
                    style={{ color: "var(--color-gold)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/get-quote" className="footer-cta-btn">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-3.5">
        <div
          className="container-wide flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
          <p>Registered in England &amp; Wales &middot; Warrington, UK</p>
        </div>
      </div>
    </footer>
  );
}
