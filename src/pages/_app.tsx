import { Header } from "@/components/layout/header";
import { Nav } from "@/components/layout/nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/register";

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
