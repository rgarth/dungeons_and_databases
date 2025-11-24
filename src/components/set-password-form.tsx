"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeInput } from "@/components/ui/ThemeComponents";

export function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

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
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to set password");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Set password error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-card)" }}>
        <p style={{ color: "var(--color-text-primary)" }}>Password set successfully! Refreshing...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            backgroundColor: "var(--color-danger)",
            color: "white",
          }}
        >
          {error}
        </div>
      )}

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
          disabled={loading}
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
          disabled={loading}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading}
      >
        {loading ? "Setting password..." : "Set Password"}
      </Button>
    </form>
  );
}

