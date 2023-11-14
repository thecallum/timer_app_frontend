import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const CreateProjectModal = (props: Props) => {
  const { isOpen, close } = props;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel="Example Modal"
      className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[600px] max-w-[calc(100%-120px)] outline-none z-30 bg-white shadow-xl rounded p-8 border border-slate-50`}
    >
      <div>
        <h2 className="text-slate-800 text-xs mb-2">Create project</h2>

        <div className="flex justify-start items-center mt-4  mb-4">
          <div className="bg-purple-600 w-6 h-6 rounded-full mr-4"></div>
          <div className="shadow-sm bg-slate-100 p-2 text-xs flex-grow text-slate-800 rounded">
            Project name
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 mt-4">
          <button className="bg-purple-600 text-white rounded px-4 py-2 text-xs shadow-md mr-2">
            Create project
          </button>
          <button
            onClick={close}
            className="bg-purple-200 text-purple-600 rounded px-4 py-2 text-xs shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
