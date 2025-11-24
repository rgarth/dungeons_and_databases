"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeInput } from "@/components/ui/ThemeComponents";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!token) {
      setError("Invalid reset link");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
            Password Reset Successful
          </h1>
          <p className="text-[var(--color-text-secondary)] text-center mb-4">
            Your password has been reset. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
      <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)]">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
          Reset Password
        </h1>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              New Password
            </label>
            <ThemeInput
              id="password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="At least 8 characters"
              disabled={loading || !token}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Confirm Password
            </label>
            <ThemeInput
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
              disabled={loading || !token}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading || !token}
          >
            {loading ? "Resetting password..." : "Reset Password"}
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
      </div>
    </div>
  );
}

