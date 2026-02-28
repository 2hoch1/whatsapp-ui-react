import { cn } from '@/utils/cn'
import React from 'react'
import type { MessageStatus } from '../MessageContext'
import { useMessage } from '../MessageContext'
import { StatusIcon } from '../StatusIcon'

/** Props for the {@link Emoji} component. */
export interface EmojiProps {
  /** The emoji character(s) to display at large size. */
  content: string
  /** Formatted time string rendered in the bottom-right corner overlay. */
  time: string
  /** Delivery status icon shown on outgoing messages. */
  status?: MessageStatus
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Emoji({ content, time, status, className }: EmojiProps): React.JSX.Element {
  const { direction } = useMessage()
  const isOut = direction === 'out'

  return (
    <div className={cn('relative inline-block', className)}>
      <p className="select-none text-5xl leading-none [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]">
        {content}
      </p>
      <span
        className={cn(
          'absolute bottom-0 right-0 flex items-center gap-0.5 rounded-full px-1.5 py-0.5',
          'bg-black/40 text-[10px] leading-none text-white backdrop-blur-sm font-medium'
        )}
      >
        {time}
        {isOut && status && <StatusIcon status={status} className="text-white" />}
      </span>
    </div>
  )
}

export { Emoji }
