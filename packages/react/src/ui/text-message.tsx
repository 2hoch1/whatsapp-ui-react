import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { senderColor } from '@/lib/color';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

const textMessageVariants = cva('whitespace-pre-wrap wrap-break-word', {
  variants: {
    size: {
      default: 'text-sm leading-relaxed',
      /** Emoji-only messages render oversized with no bubble chrome. */
      jumbo: 'select-none text-5xl leading-none [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface TextMessageProps
  extends Omit<React.ComponentProps<'div'>, 'content'>, VariantProps<typeof textMessageVariants> {
  content: string;
  direction?: MessageDirection;
  /** Sender name, shown above the text in group chats. */
  senderName?: string;
  time?: string;
  status?: MessageStatus;
}

/** True when the message is nothing but emoji, which WhatsApp renders oversized. */
function isEmojiOnly(content: string): boolean {
  const trimmed = content.trim();
  if (!trimmed) return false;
  return /^(\p{Extended_Pictographic}|️|‍)+$/u.test(trimmed);
}

function TextMessage({
  content,
  direction = 'in',
  senderName,
  time,
  status,
  size,
  className,
  ...props
}: TextMessageProps) {
  const resolvedSize = size ?? (isEmojiOnly(content) ? 'jumbo' : 'default');

  return (
    <Bubble
      data-slot="text-message"
      align={alignFor(direction)}
      variant={resolvedSize === 'jumbo' ? 'ghost' : direction === 'out' ? 'default' : 'secondary'}
      className={className}
      {...props}
    >
      <BubbleContent>
        {senderName && direction === 'in' && (
          <p
            className="mb-0.5 text-xs leading-tight font-semibold"
            style={{ color: senderColor(senderName) }}
          >
            {senderName}
          </p>
        )}
        <p className={cn(textMessageVariants({ size: resolvedSize }))}>{content}</p>
        {(time ?? status) !== undefined && (
          <MessageMeta
            time={time}
            status={status}
            direction={direction}
            className="text-muted-foreground mt-0.5 justify-end"
          />
        )}
      </BubbleContent>
    </Bubble>
  );
}

export interface SystemMessageProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

/**
 * Centred notice in the message flow: encryption banners, "you were added", and similar.
 * Replaces the `Event` component of the pre-monorepo package.
 */
function SystemMessage({ className, children, ...props }: SystemMessageProps) {
  return (
    <div
      data-slot="system-message"
      role="status"
      className={cn('flex w-full justify-center px-4 py-1', className)}
      {...props}
    >
      <span className="bg-muted text-muted-foreground max-w-[80%] rounded-lg px-3 py-1.5 text-center text-xs leading-relaxed">
        {children}
      </span>
    </div>
  );
}

export { TextMessage, SystemMessage, textMessageVariants };
