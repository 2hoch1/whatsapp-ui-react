import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link File} component. */
export interface FileProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function File({ className }: FileProps): React.JSX.Element {
  return <div className={cn('w-[336px]', className)} />
}

export { File }
