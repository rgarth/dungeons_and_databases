"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SetPasswordForm } from "./set-password-form";
import { Button } from "./ui/Button";

export function PasswordSetupBanner() {
  const { data: session } = useSession();
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function checkPassword() {
      if (!session?.user?.id) return;

      try {
        const response = await fetch("/api/auth/check-password");
        if (response.ok) {
          const data = await response.json();
          setHasPassword(data.hasPassword);
        }
      } catch (error) {
        console.error("Error checking password:", error);
      }
    }

    checkPassword();
  }, [session]);

  if (!session || hasPassword === null || hasPassword) {
    return null;
  }

  if (showForm) {
    return (
      <div className="p-4 mb-4 rounded-lg border" style={{ 
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-border)"
      }}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Set Your Password
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
          Set a password to enable username/password login for your account.
        </p>
        <SetPasswordForm />
      </div>
    );
  }

  return (
    <div className="p-4 mb-4 rounded-lg border" style={{ 
      backgroundColor: "var(--color-card)",
      borderColor: "var(--color-border)"
    }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
            Set Up Password Login
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            You don&apos;t have a password set. Set one now to enable username/password login.
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          size="md"
        >
          Set Password
        </Button>
      </div>
    </div>
  );
}

