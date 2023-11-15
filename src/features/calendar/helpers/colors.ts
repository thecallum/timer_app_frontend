import { ProjectColor, ProjectColors, defaultProjectColor } from "../types/types";

export const getColor = (color?: ProjectColor) => {
    return color
        ? ProjectColors[color]
        : defaultProjectColor;
}