import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { DndDataProvider } from "@/components/providers/dnd-data-provider";
import { Providers } from "./providers";

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
        <Providers />
        <SessionProvider>
          <QueryProvider>
            <DndDataProvider>
              <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {children}
              </main>
            </DndDataProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
