import { Page } from '@/components/layout/page'
import { EditProjectModal } from '@/modals/edit-project-modal'
import { useState } from 'react'
import { useCreateProjectModalContext } from '@/contexts/createProjectModalContext'
import { useProjectsContext } from '@/contexts/projectsContext'
import { Project, defaultProjectColor } from '@/types/projects'

export const Projects = () => {
  const { projects, isLoading } = useProjectsContext()
  const [editProjectModal, setEditProjectModal] = useState<Project | null>(null)
  const { openModal } = useCreateProjectModalContext()

  const openEditModal = (project: Project) => {
    setEditProjectModal(project)
  }

  const closeEditModal = () => {
    setEditProjectModal(null)
  }

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="w-[calc(100%-30px)] sm:w-[calc(100%-60px)] max-w-[1200px] overflow-y-auto">
          <div className="mb-4 flex flex-col  items-start justify-between md:flex-row md:items-center ">
            <h1 className="text-2xl text-slate-700 mb-2 md:mb-0">Projects</h1>

            <button
              onClick={openModal}
              className="bg-purple-500 shadow-md text-white rounded px-4 py-2 text-lg "
            >
              Create a new project
            </button>
          </div>

          <Page>
            <>
              <div className="overflow-x-auto">
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    {projects.length === 0 ? (
                      <div className="flex flex-col md:items-center">
                        <h2 className="text-slate-700 mb-2 text-2xl md:mb-6 md:text-3xl md:mt-2">
                          No projects
                        </h2>

                        <div>
                          {' '}
                          <button
                            onClick={openModal}
                            className="bg-purple-500 shadow-md text-white rounded px-4 py-2 text-lg"
                          >
                            Create your first project
                          </button>
                        </div>
                      </div>
                    ) : (
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
                          {projects
                            .sort((a, b) => {
                              if (
                                a.totalEventDurationInMinutes ===
                                b.totalEventDurationInMinutes
                              )
                                return 0

                              return b.totalEventDurationInMinutes >
                                a.totalEventDurationInMinutes
                                ? 1
                                : -1
                            })
                            .map((project, index) => {
                              const projectColor =
                                project?.projectColor ?? defaultProjectColor

                              return (
                                <tr key={index} className="hover:bg-slate-100">
                                  <td className="px-5 py-5 border-b border-slate-200 text-sm">
                                    <div className="flex items-center">
                                      <div
                                        className="w-2 h-2 mr-2 rounded-full"
                                        style={{
                                          background: projectColor.dark,
                                        }}
                                      ></div>
                                      <div className="text-slate-900 max-w-40 md:max-w-96 lg:max-w-lg xl:max-w-none text-ellipsis overflow-hidden">
                                        {project.description}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border-b border-slate-200 text-right text-sm">
                                    <p className="text-slate-700 whitespace-nowrap ">
                                      {(
                                        project.totalEventDurationInMinutes / 60
                                      ).toFixed(1)}{' '}
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
                    )}
                  </>
                )}
              </div>
            </>
          </Page>
        </div>
      </div>

      <EditProjectModal
        isOpen={!!editProjectModal}
        close={closeEditModal}
        key={editProjectModal?.id}
        project={editProjectModal}
      />
    </>
  )
}
