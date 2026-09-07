import { Router } from "express";
import nodemailer from "nodemailer";

const contactRouter = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "renztristanfernandezdiaz@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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

  try {
    await transporter.sendMail({
      from: `"${name}" <renztristanfernandezdiaz@gmail.com>`,
      replyTo: email,
      to: "renztristanfernandezdiaz@gmail.com",
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border:1px solid #00ffff33;border-radius:8px;padding:32px;">
          <h2 style="color:#00ffff;font-family:monospace;margin-top:0;">📡 New Portfolio Transmission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;font-family:monospace;font-size:12px;">FROM</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-family:monospace;font-size:12px;">RETURN ADDRESS</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00ffff;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888;font-family:monospace;font-size:12px;">SUBJECT</td><td style="padding:8px 0;">${subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #00ffff22;margin:20px 0;" />
          <p style="line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          <p style="font-family:monospace;font-size:11px;color:#444;margin-top:32px;">Sent via renztristanfernandezdiaz.replit.app</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: "Failed to send email.", detail: msg });
  }
});

export default contactRouter;
