import { ModalContainer } from '@/modals/components'
import { useEffect, useState } from 'react'
import { CreateModalForm } from './create-modal-form'
import { IProject, ProjectColor } from '@/contexts/projectsContext/types'

interface Props {
  isOpen: boolean
  close: () => void
  onCreate: (project: IProject) => void
  projects: IProject[]
}

export const CreateProjectModal = (props: Props) => {
  const { isOpen, close, onCreate, projects } = props

  const getRandomProjectColor = (): ProjectColor => {
    const usedColors: Set<ProjectColor> = new Set(
      projects
        .map((x) => x?.color ?? null)
        .filter((x) => x !== null) as ProjectColor[],
    )

    const enumValues: ProjectColor[] = Object.values(ProjectColor).filter(
      (value) => typeof value === 'number',
    ) as ProjectColor[]

    const unusedEnumValues = enumValues.filter((x) => !usedColors.has(x))

    // if unused values, take from that list. else just use random values
    const randomIndex = Math.floor(
      Math.random() *
        (unusedEnumValues.length === 0
          ? enumValues.length
          : unusedEnumValues.length),
    ) // Generate a random index

    const randomEnumKey = enumValues[randomIndex] // Get the enum key

    return randomEnumKey
  }

  const [modalColor, setModalColor] = useState(getRandomProjectColor())

  useEffect(() => {
    setModalColor(getRandomProjectColor())
  }, [isOpen])

  const onSubmit = (project: IProject) => {
    onCreate(project)
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      close={close}
      contentLabel="Create a project"
    >
      <CreateModalForm
        modalColor={modalColor}
        onSubmit={onSubmit}
        close={close}
      />
    </ModalContainer>
  )
}
