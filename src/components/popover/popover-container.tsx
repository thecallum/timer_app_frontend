import classNames from "classnames";

interface Props {
  children: JSX.Element;
  width?: string;
}

export const PopoverContainer = (props: Props) => {
  const { children, width } = props;

  return (
    <div
      className={classNames(
        "bg-white shadow-xl rounded-md border border-slate-50 z-10",
        { [width as string]: width }
      )}
    >
      {children}
    </div>
  );
};
