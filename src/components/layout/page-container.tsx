interface Props {
  children: JSX.Element;
}

export const PageContainerLarge = (props: Props) => {
  const { children } = props;

  return (
    <ContainerFullWidth>
      <div className="bg-white p-8 shadow-lg rounded border-purple-600  border-t-8 h-full ">
        {children}
      </div>
    </ContainerFullWidth>
  );
};

export const ContainerFullWidth = (props: Props) => {
  const { children } = props;

  return (
    <div className="flex justify-between items-center w-full flex-col h-full">
      <div className="w-[calc(100%-60px)] h-[calc(100%-4rem)]">{children}</div>
    </div>
  );
};
