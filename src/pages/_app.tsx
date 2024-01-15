import { Header } from "@/components/layout/header";
import { Nav } from "@/components/layout/nav";
import { CalendarContextProvider } from "@/contexts/calendarEventContext";
import { ClickOutContextProvider } from "@/contexts/clickOutContext";
import { CreateProjectModalContextProvider } from "@/contexts/createProjectModalContext";
import { ProjectsContextProvider } from "@/contexts/projectsContext";
import { TimerContextProvider } from "@/features/timer/context/contextProvider";
import { CreateProjectModalContainer } from "@/modals/create-project-modal-container";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const authPages = new Set(["/calendar", "/projects"]);

interface Props {
  children: JSX.Element;
}

const ContextProviderWrappers = ({ children }: Props) => {
  return (
    <ProjectsContextProvider>
      <CalendarContextProvider>
        <ClickOutContextProvider>
          <TimerContextProvider>
            <CreateProjectModalContextProvider>
              {children}
            </CreateProjectModalContextProvider>
          </TimerContextProvider>
        </ClickOutContextProvider>
      </CalendarContextProvider>
    </ProjectsContextProvider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isAuthorizedPage = authPages.has(router.pathname);

  return (
    <ContextProviderWrappers>
      <>
        <Header showTimerControls={isAuthorizedPage} />

        <div className="flex flex-row h-[calc(100vh-4rem)]">
          {isAuthorizedPage && <Nav />}
          <div className="flex-grow">
            <Component {...pageProps} />
          </div>
        </div>

        <CreateProjectModalContainer />
      </>
    </ContextProviderWrappers>
  );
}
