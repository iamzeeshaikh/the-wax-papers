import { SITE_NAME } from "@/lib/constants";

/**
 * SMTP settings shared by the quote and contact routes, using the same
 * variable names as the other packaging sites:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 *   SMTP_TO, SMTP_FROM_NAME, SMTP_FROM_EMAIL
 */
export function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = Number(process.env.SMTP_PORT) || 587;

  return {
    host,
    port,
    // Port 465 is implicit TLS; SMTP_SECURE can force it either way.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    pass,
    configured: Boolean(host && user && pass),
  };
}

/** Address the site emails land in. */
export function getMailRecipient() {
  return process.env.SMTP_TO?.trim() || process.env.SMTP_USER?.trim() || "";
}

/** From header, e.g. `"The Wax Papers" <info@thewaxpapers.co.uk>`. */
export function getMailFrom() {
  const name = process.env.SMTP_FROM_NAME?.trim() || SITE_NAME;
  const email = process.env.SMTP_FROM_EMAIL?.trim() || process.env.SMTP_USER?.trim() || "";
  return email.includes("<") ? email : `"${name}" <${email}>`;
}
