import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Event} component. */
export interface EventProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Event({ className }: EventProps): React.JSX.Element {
  return <div className={cn('w-[336px]', className)} />
}

export { Event }
