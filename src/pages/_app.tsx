import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="h-16 bg-slate-700 flex items-center flex-col justify-center">
        <div className="flex flex-row justify-between items-center w-[calc(100%-60px)]">
          <div
            className="bg-slate-600 rounded-md p-1 px-2 text-slate-300 flex justify-start items-center"
            style={{ fontFamily: "Nova Square" }}
          >
            <span>Time</span>
            <span className="w-2 h-2 mx-2 rounded-full bg-purple-300 block"></span>
            <span>Tracker</span>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </div>
  );
}
