"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { AuthForm } from "./auth-form";

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
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/favicon.svg"
            alt="Dungeons & Databases Logo"
            width={64}
            height={64}
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Dungeons & Databases</h1>
        </div>
        <div className="w-full max-w-md px-6">
          <AuthForm />
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 