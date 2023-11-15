interface Props {
  children: JSX.Element;
  title: string;
}

export const PopoverLayout = (props: Props) => {
  const { children, title } = props;

  return (
    <div className="p-4">
      <h2 className="text-slate-800 text-xs mb-2">{title}</h2>

      {children}
    </div>
  );
};
