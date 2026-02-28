import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Contact} component. */
export interface ContactProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Contact({ className }: ContactProps): React.JSX.Element {
  return <div className={cn('w-[336px]', className)} />
}

export { Contact }
