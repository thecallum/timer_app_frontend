import { ErrorMessage, TextInput } from "@/components/form";
import { ButtonPrimary, ButtonSecondary } from "@/components/form/buttons";
import { ModalContainer, ModalControls, ModalLayout } from "@/modals/components";
import { IProject } from "@/features/calendar/types/types";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  project: IProject | null;
  onSubmit: (project: IProject) => void;
  close: () => void;
  deleteProject: (project: IProject) => void;
}

export const EditProjectModal = (props: Props) => {
  const { isOpen, project, onSubmit, close, deleteProject } = props;

  const [name, setName] = useState(project?.name ?? "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (name === null || name.trim() === "") {
      errors["name"] = "Name cannot be empty";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length >= 1) {
      return;
    }

    onSubmit({
      ...(project as IProject),
      name,
    });
  };

  return (
    <ModalContainer isOpen={isOpen} close={close} contentLabel="Edit project">
      <form onSubmit={handleSubmit}>
        {!!project && (
          <>
            <ModalLayout
              title="Edit Project"
              onDelete={() => deleteProject(project)}
            >
              <>
                <TextInput
                  autoFocus
                  value={name}
                  setValue={setName}
                  id="name"
                  name="name"
                  ariaLabel="Project name"
                  placeholder="Planning"
                  error={errors?.name}
                />
                {errors?.name && <ErrorMessage message={errors?.name} />}
              </>
            </ModalLayout>

            <ModalControls>
              <>
                <ButtonPrimary type="submit">Create project</ButtonPrimary>
                <ButtonSecondary onClick={close}>Close</ButtonSecondary>
              </>
            </ModalControls>
          </>
        )}
      </form>
    </ModalContainer>
  );
};
