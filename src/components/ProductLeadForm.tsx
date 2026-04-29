"use client";

import { useState } from "react";

interface Props {
  productName: string;
}

export default function ProductLeadForm({ productName }: Props) {
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
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not send. Please email us at Info@thewaxpapers.co.uk");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "var(--color-gold-pale)" }}
        >
          <svg className="w-7 h-7" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
          Quote Request Sent!
        </h3>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          We&apos;ll review your requirements and respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Hidden field pre-fills the product type */}
      <input type="hidden" name="productType" value={productName} />

      {error && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}>
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="plf-name">
            Full Name <span style={{ color: "var(--color-gold)" }}>*</span>
          </label>
          <input
            id="plf-name"
            name="name"
            type="text"
            required
            className="form-input"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="plf-email">
            Email Address <span style={{ color: "var(--color-gold)" }}>*</span>
          </label>
          <input
            id="plf-email"
            name="email"
            type="email"
            required
            className="form-input"
            placeholder="jane@yourbusiness.co.uk"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="plf-phone">Phone Number</label>
          <input
            id="plf-phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+44 7700 900000"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="plf-qty">
            Quantity Required <span style={{ color: "var(--color-gold)" }}>*</span>
          </label>
          <input
            id="plf-qty"
            name="quantity"
            type="text"
            required
            className="form-input"
            placeholder="e.g. 500 sheets"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="form-label" htmlFor="plf-message">Requirements / Notes</label>
        <textarea
          id="plf-message"
          name="message"
          rows={3}
          className="form-input resize-none"
          placeholder="Tell us your size, print requirements, or any questions…"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center !py-3 !text-base"
      >
        {loading ? "Sending…" : "Get My Free Quote"}
      </button>
      <p className="text-xs text-center mt-3" style={{ color: "var(--color-text-muted)" }}>
        No obligation · Response within 24 hours · UK-based team
      </p>
    </form>
  );
}
