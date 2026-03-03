import { StatusDoubleCheckIcon, StatusSendingIcon, StatusSentIcon } from '@/icons'
import { cn } from '@/utils/cn'
import React from 'react'
import type { MessageStatus } from './MessageContext'

/** @internal */
export interface StatusIconProps {
  /** Delivery status to visualise. */
  status: MessageStatus
  /** Additional CSS class names applied to the icon. */
  className?: string
}

function StatusIcon({ status, className }: StatusIconProps): React.JSX.Element {
  if (status === 'sending') {
    return <StatusSendingIcon className={cn('size-3.5', className)} />
  }
  if (status === 'sent') {
    return <StatusSentIcon className={cn('size-4', className)} />
  }
  return (
    <StatusDoubleCheckIcon
      className={cn('size-4', status === 'read' && 'text-[#53bdeb]', className)}
    />
  )
}

export { StatusIcon }
