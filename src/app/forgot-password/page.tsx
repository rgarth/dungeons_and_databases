"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeInput } from "@/components/ui/ThemeComponents";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to request password reset");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMsg);
    } finally {
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
              onSubmit={handleSubmit}
              className="space-y-4"
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

