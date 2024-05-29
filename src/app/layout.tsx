"use client";

import Navbar from "@/components/navbar";
import "@/styles/global.css";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loginUser, setLoginUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.length === 0) {
      router.push("/login");
    } else if (sessionStorage.length !== 0 && pathname === "/login") {
      router.push("/");
    }
    setLoading(false);
  }, [pathname]);

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
  }

  return (
    <GlobalContext.Provider value={[loginUser, setLoginUser]}>
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
          <div className="rootlayout">
            <Navbar />
            <div>
              <main>{children}</main>
            </div>
          </div>
        </body>
      </html>
    </GlobalContext.Provider>
  );
}
