import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name        = (data.get("name")        as string) || "";
    const email       = (data.get("email")       as string) || "";
    const phone       = (data.get("phone")       as string) || "";
    const company     = (data.get("company")     as string) || "";
    const productType = (data.get("productType") as string) || "";
    const quantity    = (data.get("quantity")    as string) || "";
    const size        = (data.get("size")        as string) || "";
    const colour      = (data.get("colour")      as string) || "";
    const message     = (data.get("message")     as string) || "";
    const artwork     = data.get("artwork") as File | null;

    const attachments: { filename: string; content: Buffer }[] = [];
    if (artwork && artwork.size > 0) {
      const buffer = Buffer.from(await artwork.arrayBuffer());
      attachments.push({ filename: artwork.name, content: buffer });
    }

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
      subject: `New Quote Request — ${productType || "General"} from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <div style="background:#4a2c15;padding:24px 32px;">
            <h1 style="color:#c8963a;margin:0;font-size:20px;">New Quote Request</h1>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">The Wax Papers — thewaxpapers.co.uk</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#6b7280;width:160px;">Full Name</td><td style="padding:8px 0;font-weight:600;color:#111;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111;"><a href="mailto:${email}" style="color:#c8963a;">${email}</a></td></tr>
              ${phone    ? `<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#111;">${phone}</td></tr>` : ""}
              ${company  ? `<tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;color:#111;">${company}</td></tr>` : ""}
              <tr><td style="padding:8px 0;color:#6b7280;">Product</td><td style="padding:8px 0;font-weight:600;color:#111;">${productType}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;">Quantity</td><td style="padding:8px 0;color:#111;">${quantity}</td></tr>
              ${size     ? `<tr><td style="padding:8px 0;color:#6b7280;">Size</td><td style="padding:8px 0;color:#111;">${size}</td></tr>` : ""}
              ${colour   ? `<tr><td style="padding:8px 0;color:#6b7280;">Colour / Print</td><td style="padding:8px 0;color:#111;">${colour}</td></tr>` : ""}
              ${artwork && artwork.size > 0 ? `<tr><td style="padding:8px 0;color:#6b7280;">Artwork</td><td style="padding:8px 0;color:#111;">✓ Attached (${artwork.name})</td></tr>` : ""}
            </table>
            ${message ? `
              <div style="margin-top:20px;padding:16px;background:#fdf6ec;border-radius:6px;border-left:3px solid #c8963a;">
                <p style="margin:0 0 6px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Additional Notes</p>
                <p style="margin:0;color:#111;white-space:pre-wrap;">${message}</p>
              </div>` : ""}
            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5e7eb;">
              <a href="mailto:${email}" style="background:#c8963a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote email error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
