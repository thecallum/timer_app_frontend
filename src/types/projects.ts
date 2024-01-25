export type Project = {
  id: number
  description: string
  projectColor: ProjectColor
  totalEventDurationInMinutes: number
}

export type ProjectColor = {
  light: string
  lightest: string
  dark: string
  darkest: string
}

export const defaultProjectColor: ProjectColor = {
  light: '#e2e8f0',
  lightest: '#f1f5f9',
  dark: '#475569',
  darkest: '#020617',
}

export const defaultProject: Project = {
  id: -1,
  description: 'No project',
  projectColor: defaultProjectColor,
  totalEventDurationInMinutes: 0,
}
