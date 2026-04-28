import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://thewaxpapers.co.uk${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="py-3 text-sm"
        style={{ borderBottom: "1px solid var(--color-paper)" }}
      >
        <div className="container-wide">
          <ol className="flex items-center flex-wrap gap-1.5" style={{ color: "var(--color-text-muted)" }}>
            <li>
              <Link href="/" className="hover:underline" style={{ color: "var(--color-brown)" }}>
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {c.href ? (
                  <Link href={c.href} className="hover:underline" style={{ color: "var(--color-brown)" }}>
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--color-charcoal)" }} aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
