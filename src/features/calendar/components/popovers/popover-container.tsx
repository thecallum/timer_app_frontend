import classNames from "classnames";

interface Props {
  children: JSX.Element;
  title: string;
  width?: string;
}

export const PopoverContainer = (props: Props) => {
  const { children, title, width } = props;

  return (
    <div
      className={classNames(
        "bg-white shadow-xl rounded p-4 border border-slate-50 z-10",
        { [width as string]: width }
      )}
    >
      <h2 className="text-slate-800 text-xs mb-2">{title}</h2>

      {children}
    </div>
  );
};
