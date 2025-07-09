import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { DndDataProvider } from "@/components/providers/dnd-data-provider";
import { ClientCacheProvider } from "@/components/providers/client-cache-provider";
import { ThemeProvider } from "@/lib/theme";
import { Providers } from "./providers";
import { AuthGate } from "@/components/auth-gate";
import FloatingDiceMenu from "@/components/floating-dice-menu";
import { DiceRollProvider } from "@/components/providers/dice-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dungeons & Databases",
  description: "A modern D&D character creation and management system",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers />
          <SessionProvider>
            <AuthGate>
              <QueryProvider>
                <DndDataProvider>
                  <ClientCacheProvider>
                    <DiceRollProvider>
                      <main className="min-h-screen" style={{ background: 'var(--color-surface)' }}>
                        {children}
                        <FloatingDiceMenu />
                      </main>
                    </DiceRollProvider>
                  </ClientCacheProvider>
                </DndDataProvider>
              </QueryProvider>
            </AuthGate>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
