import {
  ContainerFullWidth,
  PageContainerLarge,
} from "@/components/layout/page-container";
import { CalendarDates } from "./components/calendar-dates";
import { CalendarGrid } from "./components/calendar-grid";
import { CalendarHours } from "./components/calendar-hours";
import { FullPageSpaceFillerContailer } from "@/components/layout/full-page-space-fillter-container";
import { CalendarEvents } from "./components/calendar-events";
import {
  ICalendarEvent,
  IProject,
} from "./types/types";
import { CalendarWeekSelect } from "./components/calendar-week-select";
import { CalendarWeekSummary } from "./components/calendar-week-summary";
import { useCalendar } from "./hooks/useCalendar";
import { useState } from "react";
import { CreateProjectModal } from "./components/modals/create-project-modal";

export const Calendar = (): ICalendarEvent => {
  const {
    events,
    weeks,
    next,
    previous,
    reset,
    updateEvent,
    addEvent,
    projects,
    addProject,
  } = useCalendar();

  const [modalOpen, setModalOpen] = useState(false);

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
                <CalendarWeekSummary events={events} />

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
          <PageContainerLarge>
            <div className="h-full flex flex-col">
              <CalendarDates weeks={weeks} events={events} />

              <div className="flex overflow-y-auto overflow-x-hidden border-t border-slate-200 relative">
                <CalendarHours />
                <div className="relative h-[calc(24*64px)] overflow-hidden flex-grow flex-shrink-0">
                  <CalendarGrid
                    projects={projects}
                    showAddProjectModal={() => setModalOpen(true)}
                    weeks={weeks}
                    addEvent={addEvent}
                    addProject={addProject}
                  />
                  <CalendarEvents
                    projects={projects}
                    showAddProjectModal={openModal}
                    events={events}
                    updateEvent={updateEvent}
                  />
                </div>
              </div>
            </div>
          </PageContainerLarge>
        </div>
      </FullPageSpaceFillerContailer>
      <div className="z-20">
        <CreateProjectModal
          isOpen={modalOpen}
          close={closeModal}
          onCreate={onCreateProject}
        />
      </div>
    </>
  );
};
