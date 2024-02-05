interface ButtonProps {
  children: JSX.Element | string
  type?: 'button' | 'reset' | 'submit'
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  disabled?: boolean
}

interface PrimaryButtonProps extends ButtonProps {
  isLoading: boolean
}

export const ButtonPrimary = (props: PrimaryButtonProps) => {
  const { children, type = 'button', onClick, disabled, isLoading } = props

  return (
    <button
      className="bg-purple-500 text-white rounded px-4 py-2 text-xs shadow-md mr-2 relative h-8"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {isLoading && <div className="lds-dual-ring-button" />}
    </button>
  )
}

export const ButtonSecondary = (props: ButtonProps) => {
  const { children, type = 'button', onClick, disabled } = props

  return (
    <button
      className=" text-purple-500 rounded px-4 py-2 text-xs shadow-md h-8"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
