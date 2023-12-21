import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export class CalendarEvent {
  public readonly id: string;
  public description: string;
  public start: dayjs.Dayjs;
  public end: dayjs.Dayjs;
  public project?: IProject;

  public left: number = 0;
  public width: number = 0;

  constructor(
    description: string,
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    project?: IProject
  ) {
    this.id = uuidv4();
    this.description = description;
    this.start = start;
    this.end = end;
    this.project = project;
  }

  public get dayOfWeek() {
    return this.start.day();
  }

  public get durationInSeconds() {
    return this.end.diff(this.start, "second");
  }

  public get durationInMinutes() {
    return Math.ceil(this.durationInSeconds / 60);
  }

  public get startTimeInSeconds() {
    return this.start.diff(this.start.startOf("day"), "second");
  }

  public get startTimeInMinutes() {
    return Math.ceil(this.startTimeInSeconds / 60);
  }

  public get endTimeInSeconds() {
    return this.startTimeInSeconds + this.durationInSeconds;
  }
}

export interface IProjectColor {
  light: string;
  dark: string;
  darkest: string;
}

export interface IProject {
  id: string;
  name: string;
  color?: ProjectColor;
}

export enum ProjectColor {
  Red,
  Orange,
  Amber,
  Yellow,
  Lime,
  Green,
  Emerald,
  Teal,
  Cyan,
  Sky,
  Indigo,
  Violet,
  Purple,
  Fuchsia,
  Pink,
  Rose,
}

export const defaultProjectColor: IProjectColor = {
  light: "#e2e8f0",
  dark: "#475569",
  darkest: "#020617",
};

// https://tailwindcss.com/docs/customizing-colors
export const ProjectColors: Readonly<{ [key in ProjectColor]: IProjectColor }> =
  {
    [ProjectColor.Red]: {
      light: "#fecaca", // Red 200
      dark: "#dc2626", // Red 600
      darkest: "#7f1d1d", // Red 900
    },
    [ProjectColor.Orange]: {
      light: "#fed7aa", // Orange 200
      dark: "#ea580c", // Orange 600
      darkest: "#7c2d12", // Orange 900
    },
    [ProjectColor.Amber]: {
      light: "#fde68a", // Amber 200
      dark: "#d97706", // Amber 600
      darkest: "#78350f", // Amber 900
    },
    [ProjectColor.Yellow]: {
      light: "#fef08a", // Yellow 200
      dark: "#ca8a04", // Yellow 600
      darkest: "#713f12", // Yellow 900
    },
    [ProjectColor.Lime]: {
      light: "#d9f99d", // Lime 200
      dark: "#65a30d", // Lime 600
      darkest: "#365314", // Lime 900
    },
    [ProjectColor.Green]: {
      light: "#bbf7d0", // Green 200
      dark: "#16a34a", // Green 600
      darkest: "#14532d", // Green 900
    },
    [ProjectColor.Emerald]: {
      light: "#a7f3d0", // Emerald 200
      dark: "#059669", // Emerald 600
      darkest: "#064e3b", // Emerald 900
    },
    [ProjectColor.Teal]: {
      light: "#99f6e4", // Teal 200
      dark: "#0d9488", // Teal 600
      darkest: "#134e4a", // Teal 900
    },
    [ProjectColor.Cyan]: {
      light: "#a5f3fc", // Cyan 200
      dark: "#0891b2", // Cyan 600
      darkest: "#164e63", // Cyan 900
    },
    [ProjectColor.Sky]: {
      light: "#bae6fd", // Sky 200
      dark: "#0284c7", // Sky 600
      darkest: "#0c4a6e", // Sky 900
    },
    [ProjectColor.Indigo]: {
      light: "#c7d2fe", // Indigo 200
      dark: "#4f46e5", // Indigo 600
      darkest: "#312e81", // Indigo 900
    },
    [ProjectColor.Violet]: {
      light: "#ddd6fe", // Violet 200
      dark: "#7c3aed", // Violet 600
      darkest: "#4c1d95", // Violet 900
    },
    [ProjectColor.Purple]: {
      light: "#e9d5ff", // Purple 200
      dark: "#9333ea", // Purple 600
      darkest: "#581c87", // Purple 900
    },
    [ProjectColor.Fuchsia]: {
      light: "#f5d0fe", // Fuchsia 200
      dark: "#c026d3", // Fuchsia 600
      darkest: "#701a75", // Fuchsia 900
    },
    [ProjectColor.Pink]: {
      light: "#fbcfe8", // Pink 200
      dark: "#db2777", // Pink 600
      darkest: "#831843", // Pink 900
    },
    [ProjectColor.Rose]: {
      light: "#fecdd3", // Rose 200
      dark: "#e11d48", // Rose 600
      darkest: "#881337", // Rose 900
    },
  };

export const defaultProject: IProject = {
  id: uuidv4(),
  name: "No project",
};
