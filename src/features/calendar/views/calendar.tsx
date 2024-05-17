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
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'

export enum GridSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge',
}

export enum CalendarView {
  Week = 'Week',
  Day = 'Day',
}

export const Calendar = () => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)

  const [gridSize, setGridSize] = useState<GridSize>(GridSize.Medium)

  const { calendarView, setCalendarView } = useCalendarEventsContext()

  const calculateGridSizeMultiplier = () => {
    if (gridSize === GridSize.Small) return 1
    if (gridSize === GridSize.Medium) return 1.5
    if (gridSize === GridSize.Large) return 2

    // XLarge
    return 4
  }

  const gridSizeMultiplier = calculateGridSizeMultiplier()

  return (
    <FullPageSpaceFillerContailer
      top={
        <ContainerFullWidth>
          <>
            <h1 className="text-slate-800 text-2xl mb-4">Calendar</h1>

            <div className="flex flex-col justify-between items-start sm:flex-row">
              <CalendarWeekSummary calendarView={calendarView} />

              <div className="flex flex-row justify-end items-center">
                <div className="mr-6">
                  <div>
                    <select
                      name="calendarGridSize"
                      id="calendarGridSize"
                      value={gridSize}
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setGridSize(e.target.value as GridSize)
                      }
                      className="bg-white rounded  border-slate-300 border h-14 px-4 shadow-sm text-slate-800 flex justify-center items-center text-center"
                    >
                      {Object.values(GridSize).map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label
                    htmlFor="calendarGridSize"
                    className="text-slate-500 text-xs mb-1"
                  >
                    Grid size
                  </label>
                </div>

                <div className="mr-6">
                  <div>
                    <select
                      name="calendarGridSize"
                      id="calendarGridSize"
                      value={calendarView}
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setCalendarView(e.target.value as CalendarView)
                      }
                      className="bg-white rounded  border-slate-300 border h-14 px-4 shadow-sm text-slate-800 flex justify-center items-center text-center"
                    >
                      {Object.values(CalendarView).map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label
                    htmlFor="calendarGridSize"
                    className="text-slate-500 text-xs mb-1"
                  >
                    Calendar view
                  </label>
                </div>

                <CalendarWeekSelect />
              </div>
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
                <CalendarHours gridSizeMultiplier={gridSizeMultiplier} />
                <div
                  className="relative overflow-hidden flex-grow flex-shrink-0"
                  style={{ height: `${1536 * gridSizeMultiplier}px` }}
                >
                  <CalendarGrid
                    gridSizeMultiplier={gridSizeMultiplier}
                    containerRef={containerRef}
                  />
                  <CalendarEvents
                    containerRef={containerRef}
                    gridSizeMultiplier={gridSizeMultiplier}
                  />
                  <CurrentEventHover gridSizeMultiplier={gridSizeMultiplier} />
                </div>
              </div>
            </div>
          </Page>
        </ContainerFullWidth>
      </div>
    </FullPageSpaceFillerContailer>
  )
}
