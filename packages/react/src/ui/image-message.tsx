import * as React from 'react';

import { cn } from '@/lib/utils';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface ImageMessageProps extends React.ComponentProps<'div'> {
  src: string;
  alt?: string;
  /** Renders the muted autoplaying loop WhatsApp uses for GIFs. */
  gif?: boolean;
  caption?: string;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

function ImageMessage({
  src,
  alt = '',
  gif = false,
  caption,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: ImageMessageProps) {
  const showMeta = time !== undefined || status !== undefined;

  return (
    <Bubble
      data-slot="image-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={cn('max-w-[336px]', className)}
      {...props}
    >
      <BubbleContent className="p-1">
        <div className="relative overflow-hidden rounded-lg">
          {gif ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              aria-label={alt}
              className="w-full object-cover"
            />
          ) : (
            <img src={src} alt={alt} className="w-full object-cover" />
          )}
          {gif && (
            <span className="absolute bottom-1.5 left-1.5 rounded bg-black/50 px-1 py-0.5 text-[10px] leading-none font-semibold text-white">
              GIF
            </span>
          )}
          {!caption && showMeta && (
            <MessageMeta
              time={time}
              status={status}
              direction={direction}
              className="absolute right-1.5 bottom-1.5 rounded-full bg-black/40 px-1.5 py-0.5 text-white backdrop-blur-sm"
            />
          )}
        </div>
        {caption && (
          <div className="px-2 pt-1.5 pb-0.5">
            <p className="text-sm leading-relaxed wrap-break-word">{caption}</p>
            {showMeta && (
              <MessageMeta
                time={time}
                status={status}
                direction={direction}
                className="text-muted-foreground mt-0.5 justify-end"
              />
            )}
          </div>
        )}
      </BubbleContent>
    </Bubble>
  );
}

export { ImageMessage };
