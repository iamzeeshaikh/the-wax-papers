import FaqAnswer from "@/components/FaqAnswer";
import { extraFaqs, extraHeading, faqPageSchema } from "@/lib/page-faqs";

/** A FAQ block plus its FAQPage node, for pages that had no FAQs of their own. */
export default function ExtraFaqSection({ route }: { route: string }) {
  const faqs = extraFaqs(route);
  if (!faqs.length) return null;
  return (
    <section className="py-12" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="container-wide" style={{ maxWidth: "860px" }}>
        <div className="gold-bar mb-4" />
        <h2 className="text-xl font-bold mb-7" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
          {extraHeading(route)}
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.07)", padding: "0 1.5rem" }}>
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item" open={i === 0 || undefined}>
              <summary>
                <span>{faq.q}</span>
                <svg className="faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="faq-answer"><FaqAnswer text={faq.a} /></p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }} />
    </section>
  );
}
