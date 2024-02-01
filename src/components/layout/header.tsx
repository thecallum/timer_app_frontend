import { Logo } from './logo'
import { MenuButton } from './menu-button'

interface Props {
  toggleNavbar: () => void
}

export const Header = (props: Props) => {
  const { toggleNavbar } = props

  return (
    <header className="flex flex-col shrink-0 grow-0">
      <div className=" bg-slate-700 px-2 h-16 shadow-lg flex justify-between items-center lg:hidden">
        <Logo />

        <MenuButton toggleNavbar={toggleNavbar} />
      </div>
    </header>
  )
}
