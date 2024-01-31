interface Props {
  toggleNavbar: () => void
}

export const MenuButton = (props: Props) => {
  const { toggleNavbar } = props

  return (
    <button
      onClick={toggleNavbar}
      className="bg-slate-200 rounded-full w-8 h-8  flex items-center justify-center shrink-0 cursor-pointer"
    >
      <div className="flex flex-col items-center justify-between w-[16px] h-[12px] ">
        <div className="w-full h-[2px] bg-purple-500 rounded-sm" />
        <div className="w-full h-[2px] bg-purple-500 rounded-sm" />
        <div className="w-full h-[2px] bg-purple-500 rounded-sm" />
      </div>
    </button>
  )
}
