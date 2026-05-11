import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EN Tool",
  description: "An Evolve North internal tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  );
}
