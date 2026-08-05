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

/**
 * Every form submission must ALWAYS also reach the office inbox, regardless
 * of what SMTP_TO is set to in any environment — it is appended here in code
 * so an env change can never silently drop it.
 */
const ALWAYS_RECIPIENTS = ["customforms24@gmail.com"];

/** Address(es) the site emails land in — comma-separated for nodemailer. */
export function getMailRecipient() {
  const primary = process.env.SMTP_TO?.trim() || process.env.SMTP_USER?.trim() || "";
  const all = primary.split(",").map((a) => a.trim()).filter(Boolean);
  for (const extra of ALWAYS_RECIPIENTS) {
    if (!all.some((a) => a.toLowerCase() === extra.toLowerCase())) all.push(extra);
  }
  return all.join(", ");
}

/** From header, e.g. `"The Wax Papers" <info@thewaxpapers.co.uk>`. */
export function getMailFrom() {
  const name = process.env.SMTP_FROM_NAME?.trim() || SITE_NAME;
  const email = process.env.SMTP_FROM_EMAIL?.trim() || process.env.SMTP_USER?.trim() || "";
  return email.includes("<") ? email : `"${name}" <${email}>`;
}
