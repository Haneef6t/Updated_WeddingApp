import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const TARGET_EMAIL = process.env.TARGET_EMAIL || "tadipathrihaneef@gmail.com";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending wishes
  app.post("/api/wishes", async (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Using mock success for demo.");
        return res.json({ success: true, message: "Wish submitted successfully (Mock)" });
      }

      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [TARGET_EMAIL],
        subject: `Wedding Wish: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #d4af37; border-radius: 10px;">
            <h2 style="color: #5a0f1c; text-align: center;">New Wedding Wish</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f8f1e7; padding: 15px; border-radius: 5px; color: #5a0f1c;">
              ${message}
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666; text-align: center;">Sent via your Wedding Invitation App</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend validation error details:", JSON.stringify(error, null, 2));
        return res.status(400).json({ error: error.message || "Validation failed", details: error });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
