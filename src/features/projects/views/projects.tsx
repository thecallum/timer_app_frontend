import { Page } from '@/components/layout/page'
import { EditProjectModal } from '@/modals/edit-project-modal'
import { useState } from 'react'
import { CreateProjectModalContainer } from '@/modals/create-project-modal-container'
import { Project, defaultProjectColor } from '@/contexts/projectsContext/types'
import { useCreateProjectModalContext } from '@/contexts/createProjectModalContext'
import { useProjectsContext } from '@/contexts/projectsContext'

export const Projects = () => {
  const { projects, updateProject, deleteProject } = useProjectsContext()
  const [editProjectModal, setEditProjectModal] = useState<Project | null>(null)
  const { openModal } = useCreateProjectModalContext()

  const openEditModal = (project: Project) => {
    setEditProjectModal(project)
  }

  const closeEditModal = () => {
    setEditProjectModal(null)
  }

  const onEditProject = async (project: Project) => {
    await updateProject(project)
    closeEditModal()
  }

  const onDeleteProject = async (project: Project) => {
    await deleteProject(project)
    closeEditModal()
  }

  const projectList = Object.keys(projects)
    .map(Number)
    .map((x) => projects[x])

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="w-[calc(100%-60px)] max-w-[800px] ">
          <div className="mb-4 flex  items-center justify-between">
            <h1 className="text-2xl text-slate-700">Projects</h1>

            <button
              onClick={openModal}
              className="bg-purple-600 shadow-md text-white rounded px-4 py-2 text-lg"
            >
              Create project
            </button>
          </div>

          <Page>
            <table className="min-w-full leading-normal table-auto">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b font-normal border-slate-200 text-left text-sm text-slate-500 tracking-wider">
                    Project name
                  </th>
                  <th className="px-5 py-3 border-b font-normal border-slate-200 text-right text-sm text-slate-500 tracking-wider">
                    Total time
                  </th>
                  <th className="px-5 py-3 border-b font-normal border-slate-200 text-left text-sm text-slate-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project, index) => {
                  const projectColor =
                    project?.projectColor ?? defaultProjectColor

                  return (
                    <tr key={index} className="hover:bg-slate-100">
                      <td className="px-5 py-5 border-b border-slate-200 text-sm">
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 mr-2 rounded-full"
                            style={{ background: projectColor.dark }}
                          ></div>
                          <div className="text-slate-900 whitespace-nowrap">
                            {project.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-slate-200 text-right text-sm">
                        <p className="text-slate-700 whitespace-nowrap">
                          {(project.totalEventDurationInMinutes / 60).toFixed(
                            1,
                          )}{' '}
                          hours
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-slate-200 text-sm  ">
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-slate-700 underline whitespace-nowrap"
                        >
                          Edit project
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Page>
        </div>
      </div>

      <EditProjectModal
        isOpen={!!editProjectModal}
        close={closeEditModal}
        key={editProjectModal}
        onSubmit={onEditProject}
        project={editProjectModal}
        deleteProject={onDeleteProject}
      />

      <CreateProjectModalContainer />
    </>
  )
}
