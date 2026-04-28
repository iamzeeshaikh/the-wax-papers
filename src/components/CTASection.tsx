import Link from "next/link";

interface CTASectionProps {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  heading = "Get a Free Quote for Custom Wax Paper",
  subtext = "Tell us your requirements and we'll come back with pricing within 24 hours. UK-based, food-safe, and ready to print.",
  primaryLabel = "Get a Free Quote",
  primaryHref = "/get-quote",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact-us",
}: CTASectionProps) {
  return (
    <section
      className="py-10"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brown-dark) 0%, var(--color-brown) 100%)",
      }}
    >
      <div className="container-narrow text-center">
        <h2
          className="text-xl sm:text-2xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {heading}
        </h2>
        <p className="text-sm text-white/70 mb-6 max-w-lg mx-auto leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={primaryHref} className="btn-primary !text-sm !py-2.5 !px-5">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="btn-outline-gold !text-sm !py-2.5 !px-5">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
