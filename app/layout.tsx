import type { Metadata } from "next";
import "./global.css";
import Navbar from "./navbar";

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
    <html lang="en">
      <body>
        <div className="rootlayout">
          <Navbar />
          <div>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
