"use client";

import { useState } from "react";

const PRODUCT_TYPES = [
  "Custom Wax Paper",
  "Greaseproof Paper",
  "Printed Greaseproof Paper",
  "Burger Wrapping Paper",
  "Sandwich Paper",
  "Deli Paper",
  "Butcher Paper",
  "Bakery Paper",
  "Cheese Wrapping Paper",
  "Kraft Paper",
  "Wholesale / Bulk Order",
  "Other",
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data?.errors?.[0]?.message ?? "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Could not send your request. Please email us at Info@thewaxpapers.co.uk");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "var(--color-gold-pale)" }}
        >
          <svg className="w-8 h-8" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
          Quote Request Received
        </h3>
        <p style={{ color: "var(--color-text-muted)" }}>
          Thank you — our team will review your requirements and respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      noValidate
    >
      <h2
        className="text-2xl font-bold mb-1"
        style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}
      >
        Request a Free Quote
      </h2>
      <p className="text-sm mb-7" style={{ color: "var(--color-text-muted)" }}>
        Fill in the form below and we&apos;ll respond within 24 hours.
      </p>

      {error && (
        <div className="mb-5 p-4 rounded-lg text-sm" style={{ backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}>
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="form-label" htmlFor="q-name">Full Name <span style={{ color: "var(--color-gold)" }}>*</span></label>
          <input id="q-name" name="name" type="text" required className="form-input" placeholder="Jane Smith" />
        </div>

        {/* Email */}
        <div>
          <label className="form-label" htmlFor="q-email">Email Address <span style={{ color: "var(--color-gold)" }}>*</span></label>
          <input id="q-email" name="email" type="email" required className="form-input" placeholder="jane@yourbusiness.co.uk" />
        </div>

        {/* Phone */}
        <div>
          <label className="form-label" htmlFor="q-phone">Phone Number</label>
          <input id="q-phone" name="phone" type="tel" className="form-input" placeholder="+44 7700 900000" />
        </div>

        {/* Company */}
        <div>
          <label className="form-label" htmlFor="q-company">Company Name</label>
          <input id="q-company" name="company" type="text" className="form-input" placeholder="Your Business Ltd" />
        </div>

        {/* Product type */}
        <div>
          <label className="form-label" htmlFor="q-product">Product Type <span style={{ color: "var(--color-gold)" }}>*</span></label>
          <select id="q-product" name="productType" required className="form-input">
            <option value="">Select a product…</option>
            {PRODUCT_TYPES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="form-label" htmlFor="q-qty">Quantity Required <span style={{ color: "var(--color-gold)" }}>*</span></label>
          <input id="q-qty" name="quantity" type="text" required className="form-input" placeholder="e.g. 500 sheets, 10 rolls" />
        </div>

        {/* Size */}
        <div>
          <label className="form-label" htmlFor="q-size">Size / Dimensions</label>
          <input id="q-size" name="size" type="text" className="form-input" placeholder="e.g. 300mm × 400mm" />
        </div>

        {/* Colour */}
        <div>
          <label className="form-label" htmlFor="q-colour">Colour / Print Requirement</label>
          <input id="q-colour" name="colour" type="text" className="form-input" placeholder="e.g. Full colour, 1-colour logo" />
        </div>

        {/* Artwork upload */}
        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="q-artwork">Artwork File</label>
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
            style={{ borderColor: "var(--color-paper)" }}
          >
            <input id="q-artwork" name="artwork" type="file" accept=".pdf,.ai,.eps,.png,.jpg" className="hidden" />
            <label htmlFor="q-artwork" className="cursor-pointer">
              <svg className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Click to upload artwork
              </span>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                PDF, AI, EPS, PNG or JPG — 300 dpi minimum
              </p>
            </label>
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className="form-label" htmlFor="q-message">Additional Notes</label>
          <textarea
            id="q-message"
            name="message"
            rows={4}
            className="form-input resize-none"
            placeholder="Tell us about your requirements, deadlines, or any questions…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center mt-6 text-base !py-3.5"
      >
        {loading ? "Sending…" : "Submit Quote Request"}
      </button>

      <p className="text-xs text-center mt-4" style={{ color: "var(--color-text-muted)" }}>
        We respond within 24 hours · No obligation · UK-based team
      </p>
    </form>
  );
}
