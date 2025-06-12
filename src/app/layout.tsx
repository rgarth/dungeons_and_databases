import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dungeons & Databases - D&D Character Manager",
  description: "Create and manage your D&D characters with ease",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
