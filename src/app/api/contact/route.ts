export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sanitizeText, validateEmail } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  // Only accept multipart/form-data
  const ct = req.headers.get("content-type") ?? "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const name    = sanitizeText(data.get("name"), 100);
  const email   = sanitizeText(data.get("email"), 254);
  const subject = sanitizeText(data.get("subject"), 200);
  const message = sanitizeText(data.get("body"), 2000);

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: "Valid name is required" }, { status: 400 });
  }
  if (!validateEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email address is required" }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ ok: false, error: "Message is required" }, { status: 400 });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("SMTP environment variables not configured");
    return NextResponse.json({ ok: false, error: "Mail service unavailable" }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"The Wax Papers" <${process.env.SMTP_USER}>`,
      to: "shanzeeshan571@gmail.com",
      replyTo: email,
      subject: `Contact: ${subject || "General Enquiry"} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <div style="background:#4a2c15;padding:24px 32px;">
            <h1 style="color:#c8963a;margin:0;font-size:20px;">New Contact Message</h1>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">The Wax Papers — thewaxpapers.co.uk</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#c8963a;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;">Subject</td><td style="padding:8px 0;color:#111;">${subject || "General Enquiry"}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#fdf6ec;border-radius:6px;border-left:3px solid #c8963a;">
              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
              <p style="margin:0;color:#111;white-space:pre-wrap;">${message}</p>
            </div>
            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5e7eb;">
              <a href="mailto:${email}" style="background:#c8963a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ ok: false, error: "Failed to send. Please email us directly." }, { status: 500 });
  }
}
