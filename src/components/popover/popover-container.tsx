import classNames from 'classnames'

interface Props {
  children: JSX.Element
  width?: string
  id: string
}

export const PopoverContainer = (props: Props) => {
  const { children, width, id } = props

  return (
    <div
      id={id}
      className={classNames(
        'bg-white shadow-xl rounded-md border border-slate-50 z-10 max-w-[100vw]',
        { [width as string]: width },
      )}
    >
      {children}
    </div>
  )
}
