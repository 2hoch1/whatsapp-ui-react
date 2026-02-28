import { cn } from '@/utils/cn'
import { getInitials } from '@/utils/string'
import React from 'react'

/** @internal */
interface ChatHeaderProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
  /** Display name rendered as the primary heading. */
  name: string
  /** URL of the avatar image. Falls back to initials derived from `name` when omitted. */
  avatarUrl?: string
  /** Secondary line displayed below `name` (e.g. `"online"` or last-seen text). */
  subtitle?: string
}

function ChatHeader({ className, name, avatarUrl, subtitle }: ChatHeaderProps): React.JSX.Element {
  const initials = getInitials(name)

  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-wa-header px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.15)]',
        className
      )}
    >
      {/* Avatar */}
      <span className="shrink-0">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="size-10 rounded-full object-cover" />
        ) : (
          <span className="flex size-10 items-center justify-center rounded-full bg-wa-avatar text-sm font-medium text-wa-text-primary">
            {initials}
          </span>
        )}
      </span>

      {/* Name + subtitle */}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-medium text-wa-text-primary">{name}</span>
        {subtitle && <span className="truncate text-xs text-wa-text-secondary">{subtitle}</span>}
      </span>
    </div>
  )
}

export { ChatHeader }
export type { ChatHeaderProps }
