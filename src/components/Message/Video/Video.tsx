import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Video} component. */
export interface VideoProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Video({ className }: VideoProps): React.JSX.Element {
  return <div className={cn('w-[336px]', className)} />
}

export { Video }
