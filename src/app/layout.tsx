import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Interactive Wall Calendar",
    template: "%s | Interactive Wall Calendar",
  },
  description: "A tactile, responsive wall calendar built with Next.js 16 and client-side persistence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
