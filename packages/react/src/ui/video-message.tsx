import * as React from 'react';

import { cn } from '@/lib/utils';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface VideoMessageProps extends React.ComponentProps<'div'> {
  src: string;
  poster?: string;
  caption?: string;
  /** Formatted running time shown on the thumbnail, e.g. `'1:24'`. */
  duration?: string;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

function VideoMessage({
  src,
  poster,
  caption,
  duration,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: VideoMessageProps) {
  const showMeta = time !== undefined || status !== undefined;

  return (
    <Bubble
      data-slot="video-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={cn('max-w-[336px]', className)}
      {...props}
    >
      <BubbleContent className="p-1">
        <div className="relative overflow-hidden rounded-lg">
          <video src={src} poster={poster} controls playsInline className="w-full object-cover" />
          {duration && (
            <span className="pointer-events-none absolute top-1.5 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[10px] leading-none font-medium text-white">
              {duration}
            </span>
          )}
        </div>
        {(caption || showMeta) && (
          <div className="px-2 pt-1.5 pb-0.5">
            {caption && <p className="text-sm leading-relaxed wrap-break-word">{caption}</p>}
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

export { VideoMessage };
