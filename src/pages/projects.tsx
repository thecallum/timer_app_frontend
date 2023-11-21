import { Page } from "@/components/layout/page";
import { getColor } from "@/features/calendar/helpers/colors";
import { useCalendarEvents } from "@/features/calendar/hooks/useCalendarEvents";
import { useCalendarProjects } from "@/features/calendar/hooks/useCalendarProjects";
import { IProject } from "@/features/calendar/types/types";
import { CreateProjectModal } from "@/modals/create-project-modal";
import { EditProjectModal } from "@/modals/edit-project-modal";
import { useState } from "react";

export default function Index() {
  const { allEvents } = useCalendarEvents([]);
  const { projects, updateProject, deleteProject, addProject } =
    useCalendarProjects();

  const [editProjectModal, setEditProjectModal] = useState<IProject | null>(
    null
  );
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const openEditModal = (project: IProject) => {
    setEditProjectModal(project);
  };

  const closeEditModal = () => {
    setEditProjectModal(null);
  };

  const onEditProject = (project: IProject) => {
    updateProject(project);
    closeEditModal();
  };

  const onDeleteProject = (project: IProject) => {
    deleteProject(project);
    closeEditModal();
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalIsOpen(false);
  };

  const onCreateProject = (project: IProject) => {
    addProject(project);
    closeCreateModal();
  };

  const projectsWithTime = projects.map((x) => {
    const projectEvents = allEvents.filter((e) => {
      return e.project?.id === x.id;
    });

    const minutes = projectEvents.reduce((accumulator, currentValue) => {
      const durationInMinutes = currentValue.end.diff(
        currentValue.start,
        "minute"
      );

      return accumulator + durationInMinutes;
    }, 0);

    return {
      ...x,
      minutes,
    };
  });

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="w-[calc(100%-60px)] max-w-[800px] ">
          <div className="mb-4 flex  items-center justify-between">
            <h1 className="text-2xl text-slate-700">Projects</h1>
            <button onClick={openCreateModal} className="bg-purple-600 text-white rounded px-4 py-2 text-lg">
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
                {projectsWithTime.map((project, index) => (
                  <tr key={index} className="hover:bg-slate-100">
                    <td className="px-5 py-5 border-b border-slate-200 text-sm">
                      <div className="flex items-center">
                        <div
                          className="w-2 h-2 mr-2 rounded-full"
                          style={{ background: getColor(project.color).dark }}
                        ></div>
                        <div className="text-slate-900 whitespace-nowrap">
                          {project.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-slate-200 text-right text-sm">
                      <p className="text-slate-700 whitespace-nowrap">
                        {(project.minutes / 60).toFixed(1)} hours
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
                ))}
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

      <CreateProjectModal
        isOpen={createModalIsOpen}
        close={closeCreateModal}
        onCreate={onCreateProject}
        projects={projects}
      />
    </>
  );
}
