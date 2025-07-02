"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
        <h1 className="text-2xl text-white mb-6 font-bold">Dungeons & Databases</h1>
        <p className="text-slate-300 mb-4">Sign in to continue</p>
        <button
          onClick={() => signIn("google")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
} 