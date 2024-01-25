import { ProjectColor } from './projects'

export enum Color {
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
// https://tailwindcss.com/docs/customizing-colors

export const ProjectColors: Readonly<{
  [key in Color]: ProjectColor
}> = {
  [Color.Red]: {
    light: '#fecaca', // Red 200
    lightest: '#fee2e2', // Red 100
    dark: '#dc2626', // Red 600
    darkest: '#7f1d1d', // Red 900
  },
  [Color.Orange]: {
    light: '#fed7aa', // Orange 200
    lightest: '#ffedd5', // Orange 100
    dark: '#ea580c', // Orange 600
    darkest: '#7c2d12', // Orange 900
  },
  [Color.Amber]: {
    light: '#fde68a', // Amber 200
    lightest: '#fef3c7', // Amber 100
    dark: '#d97706', // Amber 600
    darkest: '#78350f', // Amber 900
  },
  [Color.Yellow]: {
    light: '#fef08a', // Yellow 200
    lightest: '#fef9c3', // Yellow 100
    dark: '#ca8a04', // Yellow 600
    darkest: '#713f12', // Yellow 900
  },
  [Color.Lime]: {
    light: '#d9f99d', // Lime 200
    lightest: '#ecfccb', // Lime 100
    dark: '#65a30d', // Lime 600
    darkest: '#365314', // Lime 900
  },
  [Color.Green]: {
    light: '#bbf7d0', // Green 200
    lightest: '#dcfce7', // Green 100
    dark: '#16a34a', // Green 600
    darkest: '#14532d', // Green 900
  },
  [Color.Emerald]: {
    light: '#a7f3d0', // Emerald 200
    lightest: '#d1fae5', // Emerald 100
    dark: '#059669', // Emerald 600
    darkest: '#064e3b', // Emerald 900
  },
  [Color.Teal]: {
    light: '#99f6e4', // Teal 200
    lightest: '#ccfbf1', // Teal 100
    dark: '#0d9488', // Teal 600
    darkest: '#134e4a', // Teal 900
  },
  [Color.Cyan]: {
    light: '#a5f3fc', // Cyan 200
    lightest: '#cffafe', // Cyan 100
    dark: '#0891b2', // Cyan 600
    darkest: '#164e63', // Cyan 900
  },
  [Color.Sky]: {
    light: '#bae6fd', // Sky 200
    lightest: '#e0f2fe', // Sky 100
    dark: '#0284c7', // Sky 600
    darkest: '#0c4a6e', // Sky 900
  },
  [Color.Indigo]: {
    light: '#c7d2fe', // Indigo 200
    lightest: '#e0e7ff', // Indigo 100
    dark: '#4f46e5', // Indigo 600
    darkest: '#312e81', // Indigo 900
  },
  [Color.Violet]: {
    light: '#ddd6fe', // Violet 200
    lightest: '#ede9fe', // Violet 100
    dark: '#7c3aed', // Violet 600
    darkest: '#4c1d95', // Violet 900
  },
  [Color.Purple]: {
    light: '#e9d5ff', // Purple 200
    lightest: '#f3e8ff', // Purple 100
    dark: '#9333ea', // Purple 600
    darkest: '#581c87', // Purple 900
  },
  [Color.Fuchsia]: {
    light: '#f5d0fe', // Fuchsia 200
    lightest: '#fae8ff', // Fuchsia 100
    dark: '#c026d3', // Fuchsia 600
    darkest: '#701a75', // Fuchsia 900
  },
  [Color.Pink]: {
    light: '#fbcfe8', // Pink 200
    lightest: '#fce7f3', // Pink 100
    dark: '#db2777', // Pink 600
    darkest: '#831843', // Pink 900
  },
  [Color.Rose]: {
    light: '#fecdd3', // Rose 200
    lightest: '#ffe4e6', // Rose 100
    dark: '#e11d48', // Rose 600
    darkest: '#881337', // Rose 900
  },
}
