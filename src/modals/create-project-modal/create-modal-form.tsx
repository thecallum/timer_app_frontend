import { ErrorMessage, TextInput } from "@/components/form";
import { ButtonPrimary, ButtonSecondary } from "@/components/form/buttons";
import { ModalControls, ModalLayout } from "@/modals/components";
import { getColor } from "@/features/calendar/helpers/colors";
import { IProject, ProjectColor } from "@/features/calendar/types/types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  modalColor: ProjectColor;
  onSubmit: (project: IProject) => void;
  close: () => void;
}

export const CreateModalForm = (props: Props) => {
  const { modalColor, onSubmit, close } = props;

  const [name, setName] = useState("");
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

    const newProject: IProject = {
      id: uuidv4(),
      name,
      color: modalColor,
    };

    onSubmit(newProject);
  };

  const projectColor = getColor(modalColor);

  return (
    <form onSubmit={handleSubmit}>
      <ModalLayout title="Create project">
        <>
          <div className="flex justify-start items-center mt-4 mb-2">
            <div
              className="w-6 h-6 rounded-full mr-4 flex-shrink-0"
              style={{
                background: projectColor.dark,
              }}
            />

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
          </div>
          {errors?.name && <ErrorMessage message={errors?.name} />}
        </>
      </ModalLayout>

      <ModalControls>
        <>
          <ButtonPrimary type="submit">Create project</ButtonPrimary>
          <ButtonSecondary onClick={close}>Close</ButtonSecondary>
        </>
      </ModalControls>
    </form>
  );
};
