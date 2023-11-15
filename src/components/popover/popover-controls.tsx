interface Props {
  children: JSX.Element;
}

export const PopoverControls = (props: Props) => {
  const { children } = props;

  return <div className="p-4 border-t border-slate-200 ">{children}</div>;
};
