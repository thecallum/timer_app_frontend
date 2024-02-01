interface Props {
  toggleNavbar: () => void
}

export const MenuButton = (props: Props) => {
  const { toggleNavbar } = props

  return (
    <button
      onClick={toggleNavbar}
      aria-label="Open menu"
      className={`
      w-9 h-9 rounded-full  flex items-center  justify-center shrink-0 cursor-pointer
       focus:bg-slate-600 hover:bg-slate-600
      `}
    >
      <div className="flex flex-col items-center justify-between w-[20px] h-[16px] ">
        <div className="w-full h-[2px] bg-slate-200 rounded-sm" />
        <div className="w-full h-[2px] bg-slate-200 rounded-sm" />
        <div className="w-full h-[2px] bg-slate-200 rounded-sm" />
      </div>
    </button>
  )
}
