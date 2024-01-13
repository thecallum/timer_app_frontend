import { ProjectColor, ProjectColors, defaultProjectColor } from "@/contexts/projectsContext/types";

export const getColor = (color?: ProjectColor) => {
    return color
        ? ProjectColors[color]
        : defaultProjectColor;
}