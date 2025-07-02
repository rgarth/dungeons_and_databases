"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-surface)' }}>
        <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: 'var(--color-surface)' }}>
        <h1 className="text-2xl mb-6 font-bold" style={{ color: 'var(--color-text-primary)' }}>Dungeons & Databases</h1>
        <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>Sign in to continue</p>
        <button
          onClick={() => signIn("google")}
          className="px-6 py-2 rounded-lg text-lg font-semibold shadow-md transition-colors"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
} 