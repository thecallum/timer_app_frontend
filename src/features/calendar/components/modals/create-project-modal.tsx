import { v4 as uuidv4 } from "uuid";
import { IProject, IProjectColor, ProjectColors, projectColors } from "../../types/types";
import { ModalControls, ModalLayout, ModalContainer } from "@/components/modal";
import { useEffect, useState } from "react";
import { ErrorMessage, TextInput } from "@/components/form";

interface Props {
  isOpen: boolean;
  close: () => void;
  onCreate: (project: IProject) => void;
}

export const CreateProjectModal = (props: Props) => {
  const { isOpen, close, onCreate } = props;

  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getRandomProjectColor = (): IProjectColor => {
    const enumValues: ProjectColors[] = Object.values(ProjectColors).filter(value => typeof value === 'number') as ProjectColors[];

    const randomIndex = Math.floor(Math.random() * enumValues.length); // Generate a random index
    const randomEnumKey = enumValues[randomIndex]; // Get the enum key

    return projectColors[randomEnumKey]; // Return the color object
  ;
  };

  const [modalColor, setModalColor] = useState(getRandomProjectColor())

  const resetState = () => {
    setName("");
    setErrors({});
    setModalColor(getRandomProjectColor())
  };

  useEffect(() => {
    resetState();
  }, [isOpen]);

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (name === null || name.trim() === "") {
      errors["name"] = "Name cannot be empty";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProject: IProject = {
      id: uuidv4(),
      name,
      colors: modalColor,
    };

    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length >= 1) {
      return;
    }

    onCreate(newProject);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      close={close}
      contentLabel="Create a project"
    >
      <form onSubmit={handleSubmit}>
        <ModalLayout title="Create project">
          <>
            <div className="flex justify-start items-center mt-4 mb-2">
              <div className="w-6 h-6 rounded-full mr-4" 
              
                style={{
                  background: modalColor.dark
                }}
              />

              <TextInput
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
            <button
              type="submit"
              className="bg-purple-600 text-white rounded px-4 py-2 text-xs shadow-md mr-2"
            >
              Create project
            </button>
            <button
              onClick={close}
              type="button"
              className="bg-purple-200 text-purple-600 rounded px-4 py-2 text-xs shadow-md"
            >
              Close
            </button>
          </>
        </ModalControls>
      </form>
    </ModalContainer>
  );
};
