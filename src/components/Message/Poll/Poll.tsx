import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Poll} component. */
export interface PollProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Poll({ className }: PollProps): React.JSX.Element {
  return <div className={cn('w-[336px]', className)} />
}

export { Poll }
