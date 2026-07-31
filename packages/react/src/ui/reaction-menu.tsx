import * as React from 'react';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/components/popover';

/** The six reactions WhatsApp offers by default. */
export const DEFAULT_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'] as const;

export interface ReactionMenuProps {
  children: React.ReactNode;
  emojis?: readonly string[];
  /** Emoji the current user already picked, highlighted in the row. */
  value?: string;
  onSelect?: (emoji: string) => void;
  className?: string;
}

/** Quick reaction picker anchored to a message. */
function ReactionMenu({
  children,
  emojis = DEFAULT_REACTIONS,
  value,
  onSelect,
  className,
}: ReactionMenuProps) {
  return (
    <Popover>
      <PopoverTrigger data-slot="reaction-menu-trigger">{children}</PopoverTrigger>
      <PopoverContent
        data-slot="reaction-menu"
        className={cn('flex w-auto items-center gap-1 rounded-full p-1.5', className)}
      >
        {emojis.map(emoji => (
          <button
            key={emoji}
            type="button"
            aria-label={emoji}
            aria-pressed={value === emoji}
            onClick={() => onSelect?.(emoji)}
            className={cn(
              'hover:bg-accent flex size-9 items-center justify-center rounded-full text-xl transition-transform hover:scale-110',
              value === emoji && 'bg-accent'
            )}
          >
            {emoji}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export { ReactionMenu };
