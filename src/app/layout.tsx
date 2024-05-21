import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "quantum-gomoku",
  description: "quantum gomoku app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="rootlayout">
      <body>{children}</body>
    </html>
  );
}
