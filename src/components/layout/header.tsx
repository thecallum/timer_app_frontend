import { Logo } from './logo'
import { MenuButton } from './menu-button'

interface Props {
  toggleNavbar: () => void
}

export const Header = (props: Props) => {
  const { toggleNavbar } = props

  return (
    <header className="flex flex-col ">
      <div className=" bg-slate-700 px-2 py-5 shadow-lg flex justify-between lg:hidden">
        <Logo />

        <MenuButton toggleNavbar={toggleNavbar} />
      </div>
    </header>
  )
}
