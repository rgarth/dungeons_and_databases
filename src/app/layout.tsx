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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dungeons & Databases",
  description: "A modern D&D character creation and management system",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png'
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
                    <main className="min-h-screen" style={{ background: 'var(--color-surface)' }}>
                      {children}
                    </main>
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
