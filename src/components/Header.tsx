"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_PRODUCTS, SITE_PHONE, SITE_EMAIL } from "@/lib/constants";

const TOP_NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Split products into two columns for mega menu
  const half = Math.ceil(NAV_PRODUCTS.length / 2);
  const col1 = NAV_PRODUCTS.slice(0, half);
  const col2 = NAV_PRODUCTS.slice(half);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{ backgroundColor: "var(--color-charcoal)" }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: "var(--color-brown-dark)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="container-wide flex items-center justify-between py-1.5 text-xs text-white/70">
          <span>UK Supplier of Custom Food Paper &amp; Wax Paper</span>
          <div className="hidden sm:flex items-center gap-5">
            <a href={`tel:${SITE_PHONE}`} className="hover:text-white transition-colors">
              {SITE_PHONE}
            </a>
            <a href={`mailto:${SITE_EMAIL}`} className="hover:text-white transition-colors">
              {SITE_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-wide flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 leading-none">
          <Image
            src="/logo-icon.svg"
            alt="The Wax Papers logo"
            width={26}
            height={32}
            priority
          />
          <div className="flex flex-col">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-gold)" }}
            >
              The Wax Papers
            </span>
            <span className="text-[10px] tracking-widest uppercase text-white/45 mt-0.5">
              Custom Food Paper · UK
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {TOP_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Products dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
            >
              Products
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega dropdown */}
            {dropdownOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[640px] rounded-xl shadow-2xl border overflow-hidden"
                style={{
                  backgroundColor: "white",
                  borderColor: "var(--color-paper)",
                }}
              >
                <div
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    backgroundColor: "var(--color-cream-light)",
                    color: "var(--color-brown)",
                    borderBottom: "1px solid var(--color-paper)",
                  }}
                >
                  All Products
                </div>
                <div className="grid grid-cols-2 gap-0 p-4">
                  {[col1, col2].map((col, ci) => (
                    <ul key={ci} className="space-y-0.5">
                      {col.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-3 py-1.5 rounded text-sm transition-colors"
                            style={{ color: "var(--color-charcoal)" }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor =
                                "var(--color-cream)";
                              (e.currentTarget as HTMLElement).style.color = "var(--color-gold)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "";
                              (e.currentTarget as HTMLElement).style.color = "var(--color-charcoal)";
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{
                    backgroundColor: "var(--color-cream-light)",
                    borderTop: "1px solid var(--color-paper)",
                  }}
                >
                  <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    Need something bespoke?
                  </span>
                  <Link
                    href="/get-quote"
                    onClick={() => setDropdownOpen(false)}
                    className="btn-primary text-sm !py-2 !px-4"
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/wholesale-wax-paper" className="px-4 py-2 rounded text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors">
            Wholesale
          </Link>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link href="/get-quote" className="btn-primary hidden md:inline-flex text-sm !py-2 !px-4">
            Get a Free Quote
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded text-white/85 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t overflow-y-auto max-h-[80vh]"
          style={{
            backgroundColor: "var(--color-charcoal)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <nav className="container-wide py-4 space-y-1" aria-label="Mobile navigation">
            {TOP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/wholesale-wax-paper"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
            >
              Wholesale
            </Link>

            {/* Mobile products list */}
            <div className="pt-2">
              <p
                className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-gold)" }}
              >
                Products
              </p>
              {NAV_PRODUCTS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/10 transition-colors rounded"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 pb-2">
              <Link
                href="/get-quote"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Get a Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
