import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // Add connection timeout
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<void> {
  const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || "Dungeons & Databases <noreply@robgarth.com>",
    to: email,
    subject: "Reset Your Password - Dungeons & Databases",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #4CAF50;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              font-size: 12px;
              color: #666;
            }
            .token {
              font-family: monospace;
              background-color: #f5f5f5;
              padding: 10px;
              border-radius: 4px;
              word-break: break-all;
              font-size: 12px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Dungeons & Databases</h1>
            </div>
            <h2>Reset Your Password</h2>
            <p>You requested to reset your password. Click the button below to set a new password:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <div class="token">${resetUrl}</div>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
            <div class="footer">
              <p>This is an automated message from Dungeons & Databases.</p>
              <p>If you have any questions, please contact support.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Reset Your Password - Dungeons & Databases
      
      You requested to reset your password. Use the link below to set a new password:
      
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you didn't request a password reset, you can safely ignore this email.
      
      ---
      This is an automated message from Dungeons & Databases.
    `,
  };

  try {
    // Verify SMTP configuration first
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP configuration missing. Required: SMTP_HOST, SMTP_USER, SMTP_PASSWORD");
      throw new Error("Email service not configured");
    }

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    throw error;
  }
}

// Verify email configuration
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Email configuration error:", error);
    return false;
  }
}

