import { cn } from '@/utils/cn'
import { senderColor } from '@/utils/color'
import React from 'react'
import { useMessage } from '../MessageContext'
import { StatusIcon } from '../StatusIcon'

/** Props for the {@link Text} component. */
export interface TextProps {
  /** Plain text content to render. Whitespace and line breaks are preserved. */
  content: string
  /** Additional CSS class names applied to the root element. */
  className?: string
}
function Text({ content, className }: TextProps): React.JSX.Element {
  const { direction, top, group, senderName, time, status } = useMessage()
  const isOut = direction === 'out'

  return (
    <div className={cn('max-w-[65cqw] text-sm', className)}>
      {top && group && !isOut && senderName && (
        <p
          className="mb-0.5 text-xs font-semibold leading-tight"
          style={{ color: senderColor(senderName) }}
        >
          {senderName}
        </p>
      )}

      <p className="whitespace-pre-wrap break-words leading-relaxed">
        {content}
        <span
          className="pointer-events-none invisible inline-flex select-none items-end gap-0.5 pl-1 text-xs"
          aria-hidden="true"
        >
          {time}
          {isOut && status && <StatusIcon status={status} />}
        </span>
      </p>
    </div>
  )
}

export { Text }
