interface Props {
  children: JSX.Element;
  title: string;
  onDelete?: () => void;
}

export const ModalLayout = (props: Props) => {
  const { children, title, onDelete } = props;

  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-slate-800 text-xs mb-2">{title}</h2>
        {onDelete && (
          <button type="button" onClick={onDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="text-slate-400 hover:text-slate-600"
            >
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6Zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.713T10 8q-.425 0-.713.288T9 9v7q0 .425.288.713T10 17Zm4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.713T14 8q-.425 0-.713.288T13 9v7q0 .425.288.713T14 17ZM7 6v13V6Z"
              />
            </svg>
          </button>
        )}
      </div>

      {children}
    </div>
  );
};
