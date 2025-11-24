"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeInput } from "@/components/ui/ThemeComponents";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log("🔍 ForgotPasswordPage component mounted");
    // Test if console is working
    console.error("TEST ERROR LOG");
    console.warn("TEST WARN LOG");
    console.info("TEST INFO LOG");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Aggressive logging
    console.log("🚀 FORGOT PASSWORD FORM SUBMITTED");
    console.log("📧 Email value:", email);
    console.log("🔄 Current state - loading:", loading, "success:", success, "error:", error);
    
    setError("");
    setSuccess(false);
    setResetToken(null);

    if (!email || !email.trim()) {
      const msg = "Email is required";
      console.warn("⚠️ No email provided");
      setError(msg);
      alert(msg); // Also show alert for debugging
      return;
    }

    console.log("⏳ Setting loading to true...");
    setLoading(true);
    console.log("📤 Sending password reset request to /api/auth/request-reset...");

    try {
      const requestBody = JSON.stringify({ email });
      console.log("📦 Request body:", requestBody);
      
      const response = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      console.log("📥 Response received - status:", response.status, "ok:", response.ok);
      
      const data = await response.json();
      console.log("📋 Response data:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        const errorMsg = data.error || "Failed to request password reset";
        console.error("❌ Password reset request failed:", errorMsg);
        setError(errorMsg);
        alert("Error: " + errorMsg); // Also show alert
        setLoading(false);
        return;
      }

      console.log("✅ Password reset request successful!");
      setSuccess(true);
      alert("Success! Check console for details."); // Also show alert
      
      // In development, show the token
      if (data.resetToken) {
        console.log("🔑 Reset token received (dev mode):", data.resetToken);
        setResetToken(data.resetToken);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred. Please try again.";
      console.error("💥 Request reset error:", err);
      console.error("💥 Error stack:", err instanceof Error ? err.stack : "No stack");
      setError(errorMsg);
      alert("Error: " + errorMsg); // Also show alert
    } finally {
      console.log("🏁 Setting loading to false");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
      <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)]">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
          Forgot Password
        </h1>

        {success ? (
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] text-center">
              If an account exists with that email, a password reset link has been sent.
            </p>
            {resetToken && (
              <div className="p-4 rounded-lg bg-[var(--color-card-secondary)] border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  Development mode: Reset token (for testing):
                </p>
                <p className="text-xs font-mono break-all text-[var(--color-text-primary)] mb-2">
                  {resetToken}
                </p>
                <a
                  href={`/reset-password?token=${resetToken}`}
                  className="text-sm underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  Click here to reset password
                </a>
              </div>
            )}
            <Button
              onClick={() => router.push("/")}
              className="w-full"
              size="lg"
            >
              Back to login
            </Button>
          </div>
        ) : (
          <>
            {error && (
              <div
                className="p-3 rounded-lg text-sm mb-4"
                style={{
                  backgroundColor: "var(--color-danger)",
                  color: "white",
                }}
              >
                {error}
              </div>
            )}

            <p className="text-[var(--color-text-secondary)] mb-4 text-center">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            <form 
              onSubmit={(e) => {
                console.log("📝 Form onSubmit event fired - BEFORE preventDefault");
                e.preventDefault();
                e.stopPropagation();
                console.log("📝 Form onSubmit event fired - AFTER preventDefault");
                console.log("📝 Calling handleSubmit...");
                handleSubmit(e);
                console.log("📝 handleSubmit called");
              }}
              className="space-y-4"
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Email
                </label>
                <ThemeInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="your@email.com"
                  disabled={loading}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading || !email.trim()}
                onClick={() => {
                  console.log("🖱️ Button clicked!");
                  console.log("📧 Email at click time:", email);
                  console.log("🔄 Loading state:", loading);
                  // Don't prevent default - let form handle it
                }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="text-sm underline"
                style={{ color: "var(--color-accent)" }}
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

