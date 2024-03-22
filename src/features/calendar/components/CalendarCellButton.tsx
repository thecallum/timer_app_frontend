import { memo } from 'react'
import classNames from 'classnames'

interface Props {
  onClick: (e: React.MouseEvent<HTMLElement>) => void

  isActive: boolean
  isDisabled: boolean
  label: string
}

export const CalendarCellButton = memo(function CalendarCellButton(
  props: Props,
) {
  const { onClick, isActive, isDisabled, label } = props

  return (
    <button
      aria-label={label}
      className={classNames(`flex-grow cursor-pointer rounded-sm`, {
        'bg-slate-200': isActive,
        'hover:bg-slate-50': !isDisabled,
      })}
      onClick={onClick}
    />
  )
})
