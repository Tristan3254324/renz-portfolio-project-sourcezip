import { Router } from "express";

const contactRouter = Router();

const CONTACT_EMAIL = "renztristanfernandezdiaz@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

contactRouter.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    res.status(503).json({ error: "Email delivery is not configured." });
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Renz Portfolio <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[Portfolio Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border:1px solid #00ffff33;border-radius:8px;padding:32px;">
          <h2 style="color:#00ffff;font-family:monospace;margin-top:0;">📡 New Portfolio Transmission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;font-family:monospace;font-size:12px;">FROM</td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-family:monospace;font-size:12px;">RETURN ADDRESS</td><td style="padding:8px 0;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-family:monospace;font-size:12px;">SUBJECT</td><td style="padding:8px 0;">${escapeHtml(subject)}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #00ffff22;margin:20px 0;" />
          <p style="line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
          <p style="font-family:monospace;font-size:11px;color:#444;margin-top:32px;">Sent via Renz Portfolio</p>
        </div>
      `,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Resend rejected the message (${response.status}): ${detail}`);
    }

    res.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: "Failed to send email.", detail: msg });
  }
});

export default contactRouter;
