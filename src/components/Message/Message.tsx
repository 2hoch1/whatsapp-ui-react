import { AvatarPlaceholderIcon, BubbleTailIcon } from '@/icons'
import { cn } from '@/utils/cn'
import React from 'react'
import type { MessageDirection, MessageStatus } from './MessageContext'
import { MessageContext } from './MessageContext'
import { StatusIcon } from './StatusIcon'

/** Props for the {@link Message} component. */
export interface MessageProps {
  /** `'in'` for received messages, `'out'` for sent. */
  direction: MessageDirection
  /** First message in a consecutive run - renders the bubble tail. @defaultValue `false` */
  top?: boolean
  /** Part of a group chat - renders the sender avatar when `top` is `true`. @defaultValue `false` */
  group?: boolean
  /** Sender avatar URL (group chats). */
  avatarUrl?: string
  /** Sender display name (group chats). */
  senderName?: string
  /** Message content - typically one of the content components (`<Text>`, `<Image>`, etc.). */
  children: React.ReactNode
  /** Additional CSS class names applied to the root element. */
  className?: string
  /**
   * Layout mode.
   * - `'neutral'` - standard bubble with overlaid timestamp
   * - `'free'` - content fills the bubble, timestamp floats below
   * - `'custom'` - children render directly with no wrapper
   * @defaultValue `'custom'`
   */
  mode?: 'neutral' | 'free' | 'custom'
  /** Formatted time string shown in the bubble footer. */
  time?: string
  /** Delivery status icon shown on outgoing messages. */
  status?: MessageStatus
  /**
   * Identifies the sender; used by `<History>` to group consecutive messages.
   * Use `'me'` for the local user. Has no visual effect on its own.
   */
  senderId?: string
  /**
   * ISO string or `Date` marking when the message was sent.
   * Used by `<History>` to insert day-dividers and detect grouping boundaries.
   * Has no visual effect on its own.
   */
  timestamp?: string | Date
}

function Message({
  direction,
  top = false,
  group = false,
  avatarUrl,
  senderName,
  children,
  className,
  mode = 'custom',
  time,
  status,
}: MessageProps): React.JSX.Element {
  const isOut = direction === 'out'

  const TimeRow = (): React.JSX.Element => (
    <span className="flex items-center gap-0.5 text-xs font-medium text-[#8696a0]">
      {time}
      {isOut && status !== undefined && <StatusIcon status={status} />}
    </span>
  )

  const Tail = (): React.JSX.Element | null =>
    top ? (
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute top-0',
          isOut ? '-right-2 text-[#144d37]' : '-left-2 scale-x-[-1] text-[#202c33]'
        )}
      >
        <BubbleTailIcon />
      </span>
    ) : null

  const renderNeutral = (): React.JSX.Element => (
    <div
      className={cn(
        'relative w-fit rounded-[0.525rem] px-3 py-1.5 shadow-md',
        isOut ? 'bg-[#144d37] text-[#e9edef]' : 'bg-[#202c33] text-[#e9edef]',
        top && isOut && 'rounded-tr-none',
        top && !isOut && 'rounded-tl-none'
      )}
    >
      <Tail />
      {children}
      <div className="pointer-events-none absolute bottom-1 right-2">
        <TimeRow />
      </div>
    </div>
  )

  const renderFree = (): React.JSX.Element => (
    <div className="flex flex-col">
      {children}
      <div
        className={cn(
          'mt-[5px] self-end rounded-full px-1.5 py-0.5',
          isOut ? 'bg-[#144d37]' : 'bg-[#202c33]'
        )}
      >
        <TimeRow />
      </div>
    </div>
  )

  return (
    <MessageContext.Provider
      value={{
        direction,
        top,
        group,
        ...(senderName !== undefined ? { senderName } : {}),
        ...(avatarUrl !== undefined ? { avatarUrl } : {}),
        ...(time !== undefined ? { time } : {}),
        ...(status !== undefined ? { status } : {}),
      }}
    >
      <div
        className={cn(
          '@container relative flex px-2',
          top ? 'pt-[10px] pb-0.5' : 'pt-[1px] pb-0.5',
          isOut ? 'justify-end' : 'justify-start',
          className
        )}
      >
        {top && group && !isOut && (
          <span
            className="absolute -left-10 top-2 flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2a3942]"
            aria-hidden="true"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="size-full object-cover" />
            ) : (
              <AvatarPlaceholderIcon className="size-5 text-[#8696a0]" />
            )}
          </span>
        )}

        {mode === 'neutral' && renderNeutral()}
        {mode === 'free' && renderFree()}
        {mode === 'custom' && children}
      </div>
    </MessageContext.Provider>
  )
}

export { Message }
