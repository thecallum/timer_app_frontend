interface Props {
  children: JSX.Element;
}

export const PageContainerLarge = (props: Props) => {
  const { children } = props;

  //   return (
  //     <div className="bg-white w-[calc(100vw-60px)] content-center p-8 shadow-lg rounded border-purple-600  border-t-8 max-h-[calc(80vh)] ">
  //       {children}
  //     </div>
  //   );

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
    <div className="flex justify-between items-center  flex-col h-full">
      <div className="w-[calc(100vw-60px)] h-[calc(100%-4rem)]">{children}</div>
    </div>
  );
};
