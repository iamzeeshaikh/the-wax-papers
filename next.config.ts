import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Block MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Force HTTPS for 1 year, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Restrict referrer info sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Limit browser feature access
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + Google Fonts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Inline styles + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images: self + data URIs (used by Next.js Image)
      "img-src 'self' data: blob:",
      // Fonts: self + Google Fonts CDN
      "font-src 'self' https://fonts.gstatic.com",
      // API calls only to self
      "connect-src 'self'",
      // No frames allowed
      "frame-src 'none'",
      // No object embeds
      "object-src 'none'",
      // Base URI restricted to self
      "base-uri 'self'",
      // Form submissions only to self
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Prevent source maps leaking in production
  productionBrowserSourceMaps: false,

  // Disable X-Powered-By header that reveals Next.js
  poweredByHeader: false,
};

export default nextConfig;
