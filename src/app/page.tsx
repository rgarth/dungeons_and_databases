"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { LoadingModal } from "@/components/loading-modal";
import { useLoading } from "@/components/providers/loading-provider";
import { AuthForm } from "@/components/auth-form";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { assetsLoaded, setAssetsLoaded } = useLoading();
  const hasRedirected = useRef(false);

  // Redirect to characters page by default (only once)
  useEffect(() => {
    if (session && assetsLoaded && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace('/characters');
    }
  }, [session, assetsLoaded, router]);

  // Show loading modal while auth is loading OR while we have a session but haven't loaded all assets yet
  if (status === "loading" || (session && !assetsLoaded)) {
    return (
      <LoadingModal onComplete={() => setAssetsLoaded(true)} />
    );
  }

  // Show login screen if not authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Dungeons & Databases</h1>
          <AuthForm />
        </div>
      </div>
    );
  }

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
      <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)] text-center">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--color-text-secondary)]">Redirecting to characters...</p>
      </div>
    </div>
  );
}
