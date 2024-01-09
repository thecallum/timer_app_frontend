import { ProjectColor, ProjectColors, defaultProjectColor } from "../features/calendar/types/types";

export const getColor = (color?: ProjectColor) => {
    return color
        ? ProjectColors[color]
        : defaultProjectColor;
}