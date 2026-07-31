import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { StatusDoubleCheckIcon, StatusSendingIcon, StatusSentIcon } from '@/icons';

export type MessageDirection = 'in' | 'out';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

/** Maps the chat-facing direction onto the primitive's alignment prop. */
export function alignFor(direction: MessageDirection): 'start' | 'end' {
  return direction === 'out' ? 'end' : 'start';
}

const messageActionsVariants = cva(
  'flex items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover/message:opacity-100',
  {
    variants: {
      align: {
        start: 'order-last',
        end: 'order-first',
      },
    },
    defaultVariants: {
      align: 'start',
    },
  }
);

export interface MessageActionsProps
  extends useRender.ComponentProps<'div'>, VariantProps<typeof messageActionsVariants> {}

/** Hover affordances for a message row: reply, forward, react. */
function MessageActions({ className, align = 'start', render, ...props }: MessageActionsProps) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(messageActionsVariants({ align }), className),
      },
      props
    ),
    render,
    state: {
      slot: 'message-actions',
      align,
    },
  });
}

const messageReactionVariants = cva(
  'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs leading-none transition-colors',
  {
    variants: {
      active: {
        true: 'bg-primary text-primary-foreground',
        false: 'bg-muted text-muted-foreground hover:bg-accent',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface MessageReactionProps
  extends React.ComponentProps<'button'>, VariantProps<typeof messageReactionVariants> {
  emoji: string;
  count?: number;
}

/** A single emoji reaction chip, for use inside `BubbleReactions`. */
function MessageReaction({
  emoji,
  count,
  active,
  className,
  type = 'button',
  ...props
}: MessageReactionProps) {
  return (
    <button
      type={type}
      data-slot="message-reaction"
      data-active={active}
      className={cn(messageReactionVariants({ active }), className)}
      {...props}
    >
      <span aria-hidden="true">{emoji}</span>
      {count !== undefined && count > 1 && <span className="tabular-nums">{count}</span>}
    </button>
  );
}

export interface MessageStatusIconProps extends React.ComponentProps<'span'> {
  status: MessageStatus;
}

/** Delivery ticks shown in the footer of an outgoing message. */
function MessageStatusIcon({ status, className, ...props }: MessageStatusIconProps) {
  return (
    <span
      data-slot="message-status"
      data-status={status}
      aria-label={status}
      className={cn('inline-flex items-center', status === 'read' && 'text-wa-teal', className)}
      {...props}
    >
      {status === 'sending' && <StatusSendingIcon className="size-3.5" />}
      {status === 'sent' && <StatusSentIcon className="size-4" />}
      {(status === 'delivered' || status === 'read') && (
        <StatusDoubleCheckIcon className="size-4" />
      )}
    </span>
  );
}

export interface MessageMetaProps extends React.ComponentProps<'span'> {
  time?: string;
  status?: MessageStatus;
  direction?: MessageDirection;
}

/** Time plus delivery status, the pair that sits in every message footer. */
function MessageMeta({ time, status, direction = 'in', className, ...props }: MessageMetaProps) {
  return (
    <span
      data-slot="message-meta"
      className={cn('flex items-center gap-0.5 text-xs font-medium', className)}
      {...props}
    >
      {time}
      {direction === 'out' && status !== undefined && <MessageStatusIcon status={status} />}
    </span>
  );
}

export {
  MessageActions,
  MessageReaction,
  MessageStatusIcon,
  MessageMeta,
  messageActionsVariants,
  messageReactionVariants,
};

export * from '@/ui/components/message';
