import { Header } from "@/components/layout/header";
import { Nav } from "@/components/layout/nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />

      <div className="flex flex-row h-[calc(100vh-4rem)]">
          <Nav />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
