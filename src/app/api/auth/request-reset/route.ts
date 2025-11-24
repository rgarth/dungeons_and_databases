import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

// Request password reset - generates a token
export async function POST(request: NextRequest) {
  console.log("🔵 POST /api/auth/request-reset called");
  try {
    const body = await request.json();
    console.log("🔵 Request body received:", body);
    const { email } = body;
    console.log("🔵 Email extracted:", email);

    if (!email) {
      console.log("🔵 Error: Email is required");
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists with that email, a reset link has been sent." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token expires in 1 hour

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Get the base URL from the request
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = request.headers.get("x-forwarded-proto") || 
                     (host.includes("localhost") ? "http" : "https");
    const baseUrl = `${protocol}://${host}`;

    // Send email with reset link
    try {
      await sendPasswordResetEmail(user.email, resetToken, baseUrl);
      console.log(`Password reset email sent successfully to ${user.email}`);
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      console.error("Email error details:", emailError instanceof Error ? emailError.message : String(emailError));
      // Still return success to prevent email enumeration
      // But log the error for debugging
    }

    return NextResponse.json(
      { 
        message: "If an account exists with that email, a reset link has been sent."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Request reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

