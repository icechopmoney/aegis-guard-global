import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, fullName, code } = req.body as {
      email?: string;
      fullName?: string;
      code?: string;
    };

    if (!email || !code || !fullName) {
      return res.status(400).json({ error: "Missing email, fullName, or code" });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY env var on Vercel");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "no-reply@primevaultservice.org";
    const fromName = process.env.RESEND_FROM_NAME || "Prime Vault Services";

    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [email],
      subject: "Your Prime Vault One-Time Access Code",
      text: [
        `Hello ${fullName},`,
        "",
        `Your one-time Prime Vault access code is: ${code}`,
        "",
        "This code will expire in 10 minutes.",
        "",
        "For your security, do not share this code with anyone.",
        "",
        "If you did not request this code, you can safely ignore this email.",
      ].join("\n"),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error in send-asset-otp function:", error);
    return res.status(500).json({ error: "Failed to send OTP email" });
  }
}

