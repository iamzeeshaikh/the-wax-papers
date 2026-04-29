import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name    = (data.get("name")    as string) || "";
    const email   = (data.get("email")   as string) || "";
    const subject = (data.get("subject") as string) || "General Enquiry";
    const message = (data.get("body")    as string) || "";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"The Wax Papers" <${process.env.SMTP_USER}>`,
      to: "shanzeeshan571@gmail.com",
      replyTo: email,
      subject: `Contact: ${subject} — from ${name}`,
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
              <tr><td style="padding:8px 0;color:#6b7280;">Subject</td><td style="padding:8px 0;color:#111;">${subject}</td></tr>
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
    console.error("Contact email error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
