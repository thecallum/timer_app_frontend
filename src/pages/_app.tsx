import { Header } from "@/components/layout/header";
import { Nav } from "@/components/layout/nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const authRoutes = new Set(["/login", "/signup"]);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isAuthPage = authRoutes.has(router.pathname);

  return (
    <div>
      <Header />

      <div className="flex flex-row h-[calc(100vh-4rem)]">
        {!isAuthPage && <Nav />}
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
