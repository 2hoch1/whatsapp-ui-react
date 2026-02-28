import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Gif} component. */
export interface GifProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Gif({ className }: GifProps): React.JSX.Element {
  return <div className={cn('w-[336px]', className)} />
}

export { Gif }
