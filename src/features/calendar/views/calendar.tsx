import { CalendarDates } from '../components/calendar-dates'
import { CalendarGrid } from '../components/calendar-grid'
import { CalendarHours } from '../components/calendar-hours'
import { FullPageSpaceFillerContailer } from '@/components/layout/full-page-space-fillter-container'
import { CalendarEvents } from '../components/calendar-events'
import { CalendarWeekSelect } from '../components/calendar-week-select'
import { CalendarWeekSummary } from '../components/calendar-week-summary'
import { useState } from 'react'
import { ContainerFullWidth } from '@/components/layout/container-full-width'
import { Page } from '@/components/layout/page'
import { CurrentEventHover } from '../../timer/views/currentEventHover'

export const Calendar = () => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)

  return (
    <FullPageSpaceFillerContailer
      top={
        <ContainerFullWidth>
          <>
            <h1 className="text-slate-800 text-2xl mb-4 mt-8">Calendar</h1>
            <div className="flex flex-col justify-between items-start sm:flex-row">
              <CalendarWeekSummary />
              <CalendarWeekSelect />
            </div>
          </>
        </ContainerFullWidth>
      }
    >
      <div className="flex justify-center mt-4 h-full  ">
        <ContainerFullWidth>
          <Page>
            <div className="h-full flex flex-col" ref={setContainerRef}>
              <CalendarDates />
              <div className="flex overflow-y-auto overflow-x-hidden border-t border-slate-200 relative">
                <CalendarHours />
                <div className="relative h-[calc(24*2*64px)] overflow-hidden flex-grow flex-shrink-0">
                  <CalendarGrid containerRef={containerRef} />
                  <CalendarEvents containerRef={containerRef} />
                  <CurrentEventHover />
                </div>
              </div>
            </div>
          </Page>
        </ContainerFullWidth>
      </div>
    </FullPageSpaceFillerContailer>
  )
}
