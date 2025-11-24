"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { ThemeInput } from "@/components/ui/ThemeComponents";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, name: name || username }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to create account");
          setLoading(false);
          return;
        }

        // After successful signup, sign in
        console.log("🔐 Attempting to sign in after signup...");
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        console.log("🔐 Sign in result:", result);

        if (result?.error) {
          console.error("🔐 Sign in error:", result.error);
          setError("Account created but failed to sign in. Please try signing in.");
        } else if (result?.ok) {
          console.log("🔐 Sign in successful, redirecting to characters");
          // Force a page refresh to update session
          window.location.href = '/characters';
        }
      } else {
        // Sign in
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid username or password");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

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

      {isSignUp && (
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Display Name (optional)
          </label>
          <ThemeInput
            id="name"
            value={name}
            onChange={setName}
            placeholder="Your name"
            disabled={loading}
          />
        </div>
      )}

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {isSignUp ? "Username" : "Username or Email"}
        </label>
        <ThemeInput
          id="username"
          value={username}
          onChange={setUsername}
          placeholder={isSignUp ? "Choose a username" : "Username or email"}
          disabled={loading}
          required
        />
      </div>

      {isSignUp && (
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
      )}

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Password
        </label>
        <ThemeInput
          id="password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={isSignUp ? "At least 8 characters" : "Password"}
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
        {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
      </Button>

      <div className="text-center space-y-2">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
            setUsername("");
            setEmail("");
            setPassword("");
            setName("");
          }}
          className="text-sm underline block w-full"
          style={{ color: "var(--color-accent)" }}
          disabled={loading}
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
        {!isSignUp && (
          <a
            href="/forgot-password"
            onClick={(e) => {
              console.log("🔗 Forgot password link clicked!");
              e.preventDefault();
              window.location.href = "/forgot-password";
            }}
            className="text-sm underline block cursor-pointer"
            style={{ color: "var(--color-accent)" }}
          >
            Forgot password?
          </a>
        )}
      </div>
    </form>
  );
}

