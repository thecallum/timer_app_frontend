interface Props {
  top: JSX.Element;
  children: JSX.Element;
}

export const FullPageSpaceFillerContailer = (props: Props) => {
  const { top, children } = props;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div>{top}</div>
      <div className="flex-grow overflow-hidden h-full">
        {/* <div className="bg-orange-100 h-full "> */}
        {children}

        {/* </div> */}
      </div>
    </div>
  );
};
