import type { Metadata } from "next";
import Head from "next/head";
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
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
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
