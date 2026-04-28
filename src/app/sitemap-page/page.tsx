import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { NAV_PRODUCTS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sitemap | The Wax Papers",
  description: "Browse all pages on The Wax Papers website — products, blog, and information pages.",
  alternates: { canonical: `${SITE_URL}/sitemap-page` },
};

const MAIN_PAGES = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Get a Free Quote", href: "/get-quote" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
  { label: "Wholesale Wax Paper", href: "/wholesale-wax-paper" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const BLOG_POSTS = [
  { label: "What Is Custom Wax Paper Used For?", href: "/blog/what-is-custom-wax-paper-used-for" },
  { label: "Wax Paper vs Greaseproof Paper", href: "/blog/wax-paper-vs-greaseproof-paper" },
  { label: "Best Food Wrapping Paper for Cafes and Takeaways", href: "/blog/best-food-wrapping-paper-for-cafes-and-takeaways" },
  { label: "How Printed Wax Paper Helps Food Brands", href: "/blog/how-printed-wax-paper-helps-food-brands" },
  { label: "Burger Wrapping Paper Ideas for UK Restaurants", href: "/blog/burger-wrapping-paper-ideas-for-uk-restaurants" },
  { label: "Wholesale Wax Paper Buying Guide", href: "/blog/wholesale-wax-paper-buying-guide" },
];

function Section({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
        {title}
      </h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm hover:underline" style={{ color: "var(--color-brown)" }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <>
      <Breadcrumb crumbs={[{ label: "Sitemap" }]} />
      <section className="py-16" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-wide">
          <h1 className="text-4xl font-bold mb-10" style={{ fontFamily: "var(--font-heading)", color: "var(--color-charcoal)" }}>
            Sitemap
          </h1>
          <div className="space-y-12">
            <Section title="Main Pages" links={MAIN_PAGES} />
            <Section title="Product Pages" links={NAV_PRODUCTS} />
            <Section title="Blog Posts" links={BLOG_POSTS} />
          </div>
        </div>
      </section>
    </>
  );
}
