import * as React from 'react';

import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface StickerMessageProps extends React.ComponentProps<'div'> {
  src: string;
  alt?: string;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

/** Stickers render without bubble chrome, like emoji-only messages. */
function StickerMessage({
  src,
  alt = '',
  direction = 'in',
  time,
  status,
  className,
  ...props
}: StickerMessageProps) {
  return (
    <Bubble
      data-slot="sticker-message"
      align={alignFor(direction)}
      variant="ghost"
      className={className}
      {...props}
    >
      <BubbleContent>
        <div className="relative inline-block">
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="size-48 object-contain drop-shadow-sm select-none"
          />
          {(time !== undefined || status !== undefined) && (
            <MessageMeta
              time={time}
              status={status}
              direction={direction}
              className="absolute right-0 bottom-0 rounded-full bg-black/40 px-1.5 py-0.5 text-white backdrop-blur-sm"
            />
          )}
        </div>
      </BubbleContent>
    </Bubble>
  );
}

export { StickerMessage };
