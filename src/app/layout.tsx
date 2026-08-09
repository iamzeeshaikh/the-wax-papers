import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Custom Wax Paper Packaging UK`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "UK supplier of custom wax paper, printed greaseproof paper, and branded food wrapping paper. Fast turnaround, food-safe materials, low minimum orders.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    // A page that declares its own openGraph replaces this block wholesale, so
    // product and blog pages name their own image; everything else inherits the
    // generated card from src/app/opengraph-image.tsx.
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — custom wax paper packaging in the UK`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "RXYlEyIiaELu_C2sa9ekyF_LUrtZ-yJqeSdecaiZOJw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Chat widget waits for the first interaction (or 6s of idle) so it
            never competes with the page's own render and LCP. */}
        <Script id="zendesk-chat" strategy="lazyOnload">
          {`(function(){var loaded=false;function load(){if(loaded)return;loaded=true;window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set._.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');$.src='https://v2.zopim.com/?4h3lbyJihoT1mCOqDA0VoQOaVQE9qTOP';z.t=+new Date;$.type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');}['pointerdown','keydown','touchstart','scroll'].forEach(function(evt){window.addEventListener(evt,load,{once:true,passive:true})});setTimeout(load,6000);})();`}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
