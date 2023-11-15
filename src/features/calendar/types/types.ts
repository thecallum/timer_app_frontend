import dayjs from "dayjs";

export interface ICalendarEvent {
  id: string;
  description: string;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  project?: IProject;
};

export interface IProjectColor {
  light: string;
  dark: string;
  darkest: string;
}

export interface IProject {
  name: string;
  colors: IProjectColor;
}

export enum ProjectColors {
  Amber,
  Slate,
  Lime,
  Teal,
}

// https://tailwindcss.com/docs/customizing-colors
export const projectColors: { [key in ProjectColors]: IProjectColor } = {
  [ProjectColors.Amber]: {
    light: "#fde68a",
    dark: "#d97706",
    darkest: "#431407",
  },
  [ProjectColors.Slate]: {
    light: "#e2e8f0",
    dark: "#475569",
    darkest: "#020617",
  },
  [ProjectColors.Lime]: {
    light: "#d9f99d",
    dark: "#65a30d",
    darkest: "#1a2e05",
  },
  [ProjectColors.Teal]: {
    light: "#99f6e4",
    dark: "#0d9488",
    darkest: "#042f2e",
  },
};

export const defaultProject = {
  name: "No project",
  colors: projectColors[ProjectColors.Slate],
};
