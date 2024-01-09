import { CalendarDates } from "./components/calendar-dates";
import { CalendarGrid } from "./components/calendar-grid";
import { CalendarHours } from "./components/calendar-hours";
import { FullPageSpaceFillerContailer } from "@/components/layout/full-page-space-fillter-container";
import { CalendarEvents } from "./components/calendar-events";
import { IProject } from "./types/types";
import { CalendarWeekSelect } from "./components/calendar-week-select";
import { CalendarWeekSummary } from "./components/calendar-week-summary";
import { useCalendar } from "./hooks/useCalendar";
import { useState, useRef } from "react";
import { CreateProjectModal } from "../../modals/create-project-modal";
import { useCalendarProjects } from "./hooks/useCalendarProjects";
import { ContainerFullWidth } from "@/components/layout/container-full-width";
import { Page } from "@/components/layout/page";
import { filterEvents } from "./helpers/filterEvents";
import { useCalendarEvents } from "@/contexts/calendarEventContext";
import { CurrentEventHover } from "../timer/components/currentEventHover";

export const Calendar = () => {
  const { weeks, next, previous, reset, showingCurrentWeek } = useCalendar();
  const { state } = useCalendarEvents();
  const { events } = state;
  const { projects, addProject } = useCalendarProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const eventsThisWeek = filterEvents(events, weeks[0], weeks[6]);

  const closeModal = () => {
    setTimeout(() => setModalOpen(false));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const onCreateProject = (newProject: IProject) => {
    addProject(newProject);
    closeModal();
  };

  return (
    <>
      <FullPageSpaceFillerContailer
        top={
          <ContainerFullWidth>
            <>
              <h1 className="text-slate-800 text-2xl mb-4 mt-8">Calendar</h1>
              <div className="flex justify-between items-start">
                <CalendarWeekSummary events={eventsThisWeek} />

                <CalendarWeekSelect
                  weeks={weeks}
                  next={next}
                  previous={previous}
                  reset={reset}
                />
              </div>
            </>
          </ContainerFullWidth>
        }
      >
        <div className="flex justify-center mt-4 h-full  ">
          <ContainerFullWidth>
            <Page>
              <div className="h-full flex flex-col" ref={setContainerRef}>
                <CalendarDates weeks={weeks} events={events} />
                <div className="flex overflow-y-auto overflow-x-hidden border-t border-slate-200 relative">
                  <CalendarHours />
                  <div className="relative h-[calc(24*2*64px)] overflow-hidden flex-grow flex-shrink-0">
                    <CalendarGrid
                      containerRef={containerRef}
                      projects={projects}
                      showAddProjectModal={() => setModalOpen(true)}
                      weeks={weeks}
                    />
                    <CalendarEvents
                      containerRef={containerRef}
                      projects={projects}
                      showAddProjectModal={openModal}
                      events={eventsThisWeek}
                    />
                    <CurrentEventHover
                      showingCurrentWeek={showingCurrentWeek}
                    />
                  </div>
                </div>
              </div>
            </Page>
          </ContainerFullWidth>
        </div>
      </FullPageSpaceFillerContailer>
      <div className="z-20">
        <CreateProjectModal
          isOpen={modalOpen}
          close={closeModal}
          onCreate={onCreateProject}
          projects={projects}
        />
      </div>
    </>
  );
};
