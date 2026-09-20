import * as React from 'react';

import { cn } from '@/lib/utils';
import { getDisplayDate } from '@/lib/time';
import { isSameCalendarDay } from '@/lib/date';
import {
  groupMessagesByDay,
  type GroupedMessage,
  type MessageDayGroup,
} from '@/lib/group-messages';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/ui/components/message-scroller';

export interface MessageDayDividerProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  date: Date;
}

/**
 * "Today" / "Yesterday" / date label between calendar days.
 * Replaces the `DayDivider` of the pre-monorepo package.
 */
function MessageDayDivider({ date, className, ...props }: MessageDayDividerProps) {
  return (
    <div
      data-slot="message-day-divider"
      className={cn('flex w-full justify-center py-1', className)}
      {...props}
    >
      <span className="bg-muted text-muted-foreground rounded-lg px-3 py-1 text-xs font-medium">
        {getDisplayDate(date)}
      </span>
    </div>
  );
}

export interface MessageRenderContext {
  /** First message of a consecutive run from the same sender: the one that gets the tail. */
  top: boolean;
}

export interface MessageScrollerDaysProps {
  messages: GroupedMessage[];
  children: (message: GroupedMessage, context: MessageRenderContext) => React.ReactNode;
}

type DecoratedGroup = MessageDayGroup & { startsNewDay: boolean };

/**
 * Renders a thread as scroller items, inserting a day divider whenever the calendar day changes.
 * The old `History` component did this by introspecting JSX children; working from the data
 * avoids depending on element identity.
 */
function MessageScrollerDays({ messages, children }: MessageScrollerDaysProps) {
  const groups = React.useMemo(
    () =>
      groupMessagesByDay(messages).reduce<{
        items: DecoratedGroup[];
        previousDay: Date | null;
      }>(
        (state, group) => {
          const startsNewDay =
            group.dayDate !== null &&
            (state.previousDay === null || !isSameCalendarDay(group.dayDate, state.previousDay));

          return {
            items: [...state.items, { ...group, startsNewDay }],
            previousDay: group.dayDate ?? state.previousDay,
          };
        },
        { items: [], previousDay: null }
      ).items,
    [messages]
  );

  return (
    <>
      {groups.map((group, groupIndex) => {
        const { startsNewDay } = group;

        return (
          <React.Fragment key={`${group.senderId}-${groupIndex}`}>
            {startsNewDay && group.dayDate && (
              <MessageScrollerItem>
                <MessageDayDivider date={group.dayDate} />
              </MessageScrollerItem>
            )}
            {group.messages.map((message, messageIndex) => (
              <MessageScrollerItem
                key={message.id ?? `${groupIndex}-${messageIndex}`}
                className="flex flex-col"
              >
                {children(message, { top: messageIndex === 0 })}
              </MessageScrollerItem>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
}

export interface MessageThreadProps extends Omit<
  React.ComponentProps<typeof MessageScroller>,
  'children'
> {
  messages: GroupedMessage[];
  children: (message: GroupedMessage, context: MessageRenderContext) => React.ReactNode;
  /** Rendered as the first item, above the oldest message. For encryption banners and similar. */
  leading?: React.ReactNode;
  /** Pins the view to the newest message as items arrive. @defaultValue `true` */
  autoScroll?: boolean;
  /** Hides the jump-to-latest button. */
  hideScrollButton?: boolean;
}

/**
 * A whole thread in one component: provider, scroller, viewport, content and day dividers.
 * `MessageScrollerItem` throws outside a `MessageScroller`, so this wrapper exists to make the
 * correct nesting the default rather than something each caller reassembles.
 */
function MessageThread({
  messages,
  children,
  leading,
  autoScroll = true,
  hideScrollButton = false,
  className,
  ...props
}: MessageThreadProps) {
  return (
    <MessageScrollerProvider autoScroll={autoScroll}>
      <MessageScroller className={className} {...props}>
        <MessageScrollerViewport>
          <MessageScrollerContent className="gap-1 p-3">
            {leading && <MessageScrollerItem>{leading}</MessageScrollerItem>}
            <MessageScrollerDays messages={messages}>{children}</MessageScrollerDays>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        {!hideScrollButton && <MessageScrollerButton />}
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

export { MessageDayDivider, MessageScrollerDays, MessageThread };

export * from '@/ui/components/message-scroller';
