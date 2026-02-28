import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Location} component. */
export interface LocationProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Location({ className }: LocationProps): React.JSX.Element {
  return <div className={cn('w-[336px]', className)}>Location</div>
}

export { Location }
