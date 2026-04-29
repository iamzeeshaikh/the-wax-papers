"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email us at Info@thewaxpapers.co.uk");
      }
    } catch {
      setError("Could not send your message. Please email us at Info@thewaxpapers.co.uk");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "var(--color-gold-pale)" }}
        >
          <svg className="w-7 h-7" style={{ color: "var(--color-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
          Message Sent
        </h3>
        <p style={{ color: "var(--color-text-muted)" }}>
          Thank you — we&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 rounded-lg text-sm" style={{ backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}>
          {error}
        </div>
      )}
      <div>
        <label className="form-label" htmlFor="c-name">Name</label>
        <input id="c-name" name="name" type="text" required className="form-input" placeholder="Your name" />
      </div>
      <div>
        <label className="form-label" htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required className="form-input" placeholder="your@email.co.uk" />
      </div>
      <div>
        <label className="form-label" htmlFor="c-subject">Subject</label>
        <input id="c-subject" name="subject" type="text" className="form-input" placeholder="How can we help?" />
      </div>
      <div>
        <label className="form-label" htmlFor="c-message">Message</label>
        <textarea id="c-message" name="body" rows={5} required className="form-input resize-none" placeholder="Tell us about your requirements…" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
