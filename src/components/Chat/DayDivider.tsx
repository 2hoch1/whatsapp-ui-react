import { cn } from '@/utils/cn'
import { getDisplayDate } from '@/utils/time'
import React from 'react'

/** @internal */
interface DayDividerProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
  /** The calendar day this divider represents; formatted to a human-readable label. */
  date: Date
}

function DayDivider({ className, date }: DayDividerProps): React.JSX.Element {
  const displayDate = getDisplayDate(date.toISOString())

  return (
    <div className={cn('flex justify-center py-3', className)}>
      <span className="rounded-wa-divider bg-wa-divider px-3 py-1 text-[13px] font-medium text-wa-text-secondary shadow-sm">
        {displayDate}
      </span>
    </div>
  )
}

export { DayDivider, type DayDividerProps }
