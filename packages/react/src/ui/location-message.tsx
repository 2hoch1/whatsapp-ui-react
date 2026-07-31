import * as React from 'react';

import { AspectRatio } from '@/ui/components/aspect-ratio';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface LocationMessageProps extends React.ComponentProps<'div'> {
  latitude: number;
  longitude: number;
  /** Static map image. Without one the card shows the coordinates on a plain surface. */
  previewUrl?: string;
  name?: string;
  address?: string;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

function LocationMessage({
  latitude,
  longitude,
  previewUrl,
  name,
  address,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: LocationMessageProps) {
  const label = name ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  return (
    <Bubble
      data-slot="location-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={className}
      {...props}
    >
      <BubbleContent className="p-1">
        <div className="w-64 max-w-full overflow-hidden rounded-lg">
          <AspectRatio ratio={16 / 9}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={`Map showing ${label}`}
                className="size-full object-cover"
              />
            ) : (
              <div className="bg-accent text-muted-foreground flex size-full items-center justify-center text-xs">
                {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </div>
            )}
          </AspectRatio>
        </div>
        <div className="px-2 pt-1.5 pb-0.5">
          <p className="truncate text-sm font-medium">{label}</p>
          {address && <p className="text-muted-foreground truncate text-xs">{address}</p>}
          {(time !== undefined || status !== undefined) && (
            <MessageMeta
              time={time}
              status={status}
              direction={direction}
              className="text-muted-foreground mt-0.5 justify-end"
            />
          )}
        </div>
      </BubbleContent>
    </Bubble>
  );
}

export { LocationMessage };
