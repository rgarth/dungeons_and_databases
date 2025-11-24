import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

// Request password reset - generates a token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
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

    // Send email with reset link
    try {
      await sendPasswordResetEmail(user.email, resetToken);
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      // Still return success to prevent email enumeration
      // But log the error for debugging
    }

    // In development, also return the token for testing (remove in production)
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    
    if (process.env.NODE_ENV === "development") {
      console.log("Password reset token (DEV ONLY):", resetToken);
      console.log("Reset URL:", resetUrl);
    }

    return NextResponse.json(
      { 
        message: "If an account exists with that email, a reset link has been sent.",
        // Only return token in development for testing
        ...(process.env.NODE_ENV === "development" && { resetToken, resetUrl })
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

