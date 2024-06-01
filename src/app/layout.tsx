"use client";

import Navbar from "@/components/navbar";
import "@/styles/global.css";
import Head from "next/head";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  // const router = useRouter();
  const pathname = usePathname();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (sessionStorage.length === 0) {
  //     router.push("/signin");
  //   } else if (sessionStorage.length !== 0 && pathname === "/signin") {
  //     router.push("/");
  //   }
  //   setLoading(false);
  // }, [pathname]);

  // if (loading) {
  //   return (
  //     <html lang="en">
  //       <body>
  //         <div className="rootlayout">
  //           <div>Loading...</div>
  //         </div>
  //       </body>
  //     </html>
  //   );
  // }

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
