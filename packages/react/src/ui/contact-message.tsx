import * as React from 'react';

import { getInitials } from '@/lib/string';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/components/avatar';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { Button } from '@/ui/components/button';
import { Separator } from '@/ui/components/separator';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface ContactMessageProps extends React.ComponentProps<'div'> {
  name: string;
  phoneNumber?: string;
  avatarUrl?: string;
  /** Label for the call-to-action under the card. Set to `null` to hide it. */
  actionLabel?: string | null;
  onAction?: () => void;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

function ContactMessage({
  name,
  phoneNumber,
  avatarUrl,
  actionLabel = 'Message',
  onAction,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: ContactMessageProps) {
  return (
    <Bubble
      data-slot="contact-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={className}
      {...props}
    >
      <BubbleContent>
        <div className="flex w-64 max-w-full flex-col gap-2">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 shrink-0">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">{name}</span>
              {phoneNumber && (
                <span className="text-muted-foreground truncate text-xs">{phoneNumber}</span>
              )}
            </span>
          </div>

          {actionLabel !== null && (
            <>
              <Separator />
              <Button variant="ghost" size="sm" onClick={onAction} className="w-full">
                {actionLabel}
              </Button>
            </>
          )}
        </div>
        {(time !== undefined || status !== undefined) && (
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

export { ContactMessage };
