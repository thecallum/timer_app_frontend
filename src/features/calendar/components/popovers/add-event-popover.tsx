import dayjs from "dayjs";
import { Project } from "../project";
import { ICalendarEvent, IProject, defaultProject } from "../../types/types";
import {
  PopoverContainer,
  PopoverControls,
  PopoverLayout,
} from "@/components/popover";
import { useState } from "react";
import { formatDuration } from "../../helpers/formatter";
import { ErrorMessage } from "@/components/form/error-message";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { TextInput } from "@/components/form";
import { ButtonPrimary, ButtonSecondary } from "@/components/form/buttons";
import { useCalendarEvents } from "@/contexts/calendarEventContext";
import { useEffect, useRef } from "react"

interface Props {
  close: () => void;
  time: dayjs.Dayjs;
  showAddProjectModal: () => void;
  projects: IProject[];
}

export const AddEventPopover = (props: Props) => {
  const { close, time, showAddProjectModal, projects } = props;

  const { addEvent } = useCalendarEvents();

  const element = useRef(null)

  useEffect(() => {
    console.log("me visible")

    setTimeout(() => {
      // this is a temporary solution. overlay breaks scrolling
    element.current.scrollIntoView({ behavior: 'smooth', block: 'end',  })

    })
  }, [])

  const [project, setProject] = useState<IProject | null>(null);

  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState<string>(
    time.format("YYYY-MM-DDThh:mm:ss")
  );
  const [endTime, setEndTime] = useState<string>(
    time.add(15, "minute").format("hh:mm:ss")
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getEndTimeAsDate = () => {
    const [hour, minute, second] = endTime.split(":").map(Number);
    return dayjs(startDate).hour(hour).minute(minute).second(second);
  };

  const timeDifferenceInSeconds = getEndTimeAsDate().diff(
    dayjs(startDate),
    "second"
  );

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (!getEndTimeAsDate().isAfter(dayjs(startDate))) {
      errors["end"] = "End time must be after start";
    }

    if (description === null || description.trim() === "") {
      errors["description"] = "Description cannot be empty";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length >= 1) {
      return;
    }

    const newEvent: ICalendarEvent = {
      id: uuidv4(),
      start: dayjs(startDate),
      end: getEndTimeAsDate(),
      description,
      project: project ?? defaultProject,
    };

    addEvent(newEvent);
    close();
  };

  return (
    <PopoverContainer>
      <form onSubmit={handleSubmit} ref={element}>
        <PopoverLayout title="Add Event">
          <>
            <div className="mb-2">
              <TextInput
                autoFocus
                value={description}
                setValue={setDescription}
                id="description"
                name="description"
                ariaLabel="Event description"
                error={errors?.description}
              />
            </div>

            {errors?.description && (
              <ErrorMessage message={errors?.description} />
            )}

            <div className="inline-block">
              <Project
                setProject={setProject}
                project={project}
                projects={projects}
                showAddProjectModal={showAddProjectModal}
              />
            </div>

            <div className="flex mb-2">
              <div className="mr-4">
                <label
                  htmlFor="eventStartTime"
                  className="text-slate-500 text-xs"
                >
                  Start
                </label>
                <input
                  type="datetime-local"
                  name=""
                  id="eventStartTime"
                  onInput={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  className="block border rounded py-2 px-4 shadow-sm text-slate-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="eventEndTime"
                  className="text-slate-500 text-xs"
                >
                  End
                </label>
                <input
                  type="time"
                  step={1}
                  name="eventEndTime"
                  value={endTime}
                  onInput={(e) => setEndTime(e.target.value)}
                  className={classNames(
                    "block border rounded py-2 px-4 shadow-sm text-slate-600 text-sm",
                    {
                      "border-red-600": errors?.end,
                    }
                  )}
                />
              </div>
            </div>
            {errors?.end && <ErrorMessage message={errors?.end} />}

            <div>
              <label htmlFor="" className="text-slate-500 text-xs mb-1">
                Duration
              </label>

              <div>
                <div className="inline-block bg-slate-100 p-2 text-xs text-slate-800 rounded">
                  {formatDuration(timeDifferenceInSeconds)}
                </div>
              </div>
            </div>
          </>
        </PopoverLayout>

        <PopoverControls>
          <>
            <ButtonPrimary type="submit">Save</ButtonPrimary>
            <ButtonSecondary onClick={close}>Close</ButtonSecondary>
          </>
        </PopoverControls>
      </form>
    </PopoverContainer>
  );
};
