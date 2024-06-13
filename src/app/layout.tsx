"use client";

import Navbar from "@/components/navbar";
import "@/styles/global.css";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.length === 0) {
      router.push("/sign");
    } else if (sessionStorage.length !== 0 && pathname === "/sign") {
      router.push("/");
    }
    setLoading(false);
  }, [router, pathname]);

  if (loading) {
    return (
      <html lang="en">
        <body>
          <div className="rootlayout">
            <div>Loading...</div>
          </div>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body>
          <Head>
            <title>Quantum Gomoku</title>
            <meta
              name="description"
              content="Quantum gomoku is game gomoku with each stone probability of changing their color."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <Navbar />
          <div className="container">
            <div className="rootlayout">
              <div>
                <main>{children}</main>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}
