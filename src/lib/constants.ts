export const SITE_NAME = "The Wax Papers";
export const SITE_DOMAIN = "thewaxpapers.co.uk";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_EMAIL = "Info@thewaxpapers.co.uk";
export const SITE_PHONE = "+447458651107";
export const SITE_ADDRESS = "7 Greys Court, Kingsland Grange, Warrington, United Kingdom, WA1 4SH";

/**
 * Per-sheet "from" price in GBP — the lowest combination the configurator can
 * produce (greaseproof base £0.08 with the plain / no-print adjustment of
 * −£0.02, at the 10,000-sheet tier where the quantity scale is 1.0).
 *
 * This is the ONLY place the figure is written. Both the Product Offer in the
 * product page's JSON-LD and the price line shoppers read in the hero are
 * derived from it, so the number Google finds in the markup and the number on
 * the page cannot drift apart. A price in the markup that appears nowhere on
 * the landing page is what Merchant Center treats as misrepresentation.
 */
export const FROM_PRICE_GBP = 0.06;

/** Offer `priceCurrency`. This is the UK site: prices are in pounds. */
export const PRICE_CURRENCY = "GBP";

/** Offer `price`, as the string the markup carries (e.g. "0.06"). */
export const FROM_PRICE_SCHEMA = FROM_PRICE_GBP.toFixed(2);

/** The same figure as shoppers see it (e.g. "£0.06"). */
export const FROM_PRICE_DISPLAY = `£${FROM_PRICE_SCHEMA}`;

/** What the "from" price is quoted against, shown alongside it. */
export const FROM_PRICE_BASIS = "Plain greaseproof at 10,000 sheets";

/**
 * `priceValidUntil` one year after the build, as YYYY-MM-DD.
 *
 * Computed rather than hard-coded: a literal date silently goes stale, and an
 * offer whose price has expired is dropped from Google's product results.
 */
export function priceValidUntil(from: Date = new Date()): string {
  const until = new Date(from);
  until.setFullYear(until.getFullYear() + 1);
  return until.toISOString().slice(0, 10);
}

export const NAV_PRODUCTS = [
  { label: "Custom Wax Paper", href: "/custom-wax-paper" },
  { label: "Custom Printed Wax Paper", href: "/custom-printed-wax-paper" },
  { label: "Greaseproof Paper", href: "/greaseproof-paper" },
  { label: "Printed Greaseproof Paper", href: "/printed-greaseproof-paper" },
  { label: "Food Wrapping Paper", href: "/food-wrapping-paper" },
  { label: "Burger Wrapping Paper", href: "/burger-wrapping-paper" },
  { label: "Custom Burger Paper", href: "/custom-burger-paper" },
  { label: "Sandwich Wrapping Paper", href: "/sandwich-wrapping-paper" },
  { label: "Custom Sandwich Paper", href: "/custom-sandwich-paper" },
  { label: "Deli Paper", href: "/deli-paper" },
  { label: "Custom Deli Paper", href: "/custom-deli-paper" },
  { label: "Bakery Wrapping Paper", href: "/bakery-wrapping-paper" },
  { label: "Custom Bakery Paper", href: "/custom-bakery-paper" },
  { label: "Butcher Paper", href: "/butcher-paper" },
  { label: "Cheese Wrapping Paper", href: "/cheese-wrapping-paper" },
  { label: "Kraft Wax Paper", href: "/kraft-wax-paper" },
  { label: "Eco-Friendly Wax Paper", href: "/eco-friendly-wax-paper" },
  { label: "Christmas Wax Paper", href: "/christmas-wax-paper" },
  { label: "Wax Paper Sheets", href: "/wax-paper-sheets" },
  { label: "Wax Paper Rolls", href: "/wax-paper-rolls" },
  { label: "Wholesale Wax Paper", href: "/wholesale-wax-paper" },
  { label: "Personalised Wax Paper UK", href: "/personalised-wax-paper-uk" },
  { label: "Custom Food Paper", href: "/custom-food-paper" },
  { label: "Wax Paper Packaging", href: "/wax-paper-packaging" },
  { label: "Logo Printed Wax Paper", href: "/logo-printed-wax-paper" },
  { label: "Branded Greaseproof Paper", href: "/branded-greaseproof-paper" },
  { label: "Custom Branded Wax Paper", href: "/custom-branded-wax-paper" },
  { label: "Custom Food Wrapping Paper", href: "/custom-food-wrapping-paper" },
  { label: "Printed Food Wrapping Paper", href: "/printed-food-wrapping-paper" },
  { label: "White Wax Paper", href: "/white-wax-paper" },
  { label: "Black Wax Paper", href: "/black-wax-paper" },
];

export const FOOTER_PRODUCT_LINKS = [
  { label: "Custom Wax Paper", href: "/custom-wax-paper" },
  { label: "Greaseproof Paper", href: "/greaseproof-paper" },
  { label: "Burger Wrapping Paper", href: "/burger-wrapping-paper" },
  { label: "Sandwich Wrapping Paper", href: "/sandwich-wrapping-paper" },
  { label: "Deli Paper", href: "/deli-paper" },
  { label: "Bakery Wrapping Paper", href: "/bakery-wrapping-paper" },
  { label: "Butcher Paper", href: "/butcher-paper" },
  { label: "Cheese Wrapping Paper", href: "/cheese-wrapping-paper" },
  { label: "Kraft Wax Paper", href: "/kraft-wax-paper" },
  { label: "Wholesale Wax Paper", href: "/wholesale-wax-paper" },
  { label: "Wax Paper Sheets", href: "/wax-paper-sheets" },
  { label: "Wax Paper Rolls", href: "/wax-paper-rolls" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Get a Free Quote", href: "/get-quote" },
  { label: "Blog", href: "/blog" },
  { label: "UK Delivery Locations", href: "/locations" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Sitemap", href: "/sitemap-page" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];
