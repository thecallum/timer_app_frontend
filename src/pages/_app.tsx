import { Header } from "@/components/layout/header";
import { Nav } from "@/components/layout/nav";
import { CalendarContextProvider } from "@/contexts/calendarEventContext";
import { ClickOutContextProvider } from "@/contexts/clickOutContext";
import { TimerContextProvider } from "@/features/timer/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

// routes to show sidebar
const sidebarRoutes = new Set(["/calendar", "/projects"]);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const showSidebar = sidebarRoutes.has(router.pathname);

  return (
    <div>
      <CalendarContextProvider>
        <ClickOutContextProvider>
          <TimerContextProvider>
            <>
              <Header />

              <div className="flex flex-row h-[calc(100vh-4rem)]">
                {showSidebar && <Nav />}
                <div className="flex-grow">
                  <Component {...pageProps} />
                </div>
              </div>
            </>
          </TimerContextProvider>
        </ClickOutContextProvider>
      </CalendarContextProvider>
    </div>
  );
}
