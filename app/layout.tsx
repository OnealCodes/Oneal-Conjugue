import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oneal Conjugue! — Prototype (Phase 0)",
  description: "Phase 0 prototype: Conjugation Workshop loop + consequence replay. Demo only.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
