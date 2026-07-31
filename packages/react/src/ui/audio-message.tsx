import * as React from 'react';

import { cn } from '@/lib/utils';
import { fmtTime } from '@/lib/audio';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { AudioFileIcon, PauseIcon, PlayIcon } from '@/icons';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface AudioMessageProps extends React.ComponentProps<'div'> {
  src: string;
  /** Fallback duration shown before metadata loads, e.g. `'0:42'`. */
  duration?: string;
  fileName?: string;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

function AudioMessage({
  src,
  duration,
  fileName,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: AudioMessageProps) {
  const { audioRef, playing, progress, remaining, totalDuration, toggle, seek } =
    useAudioPlayer(src);

  const displayDuration = totalDuration > 0 ? fmtTime(remaining) : (duration ?? '0:00');

  return (
    <Bubble
      data-slot="audio-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={className}
      {...props}
    >
      <BubbleContent>
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex w-72 max-w-full items-center gap-3">
          <span
            aria-hidden="true"
            className="bg-accent flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
          >
            <AudioFileIcon title={fileName} />
          </span>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            className="text-muted-foreground shrink-0 transition-opacity hover:opacity-70"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="relative h-6 flex-1">
            <div className="bg-muted-foreground/40 pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full" />
            <div
              className="bg-wa-teal pointer-events-none absolute top-1/2 left-0 h-0.5 -translate-y-1/2 rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
            <span
              aria-hidden="true"
              className="bg-wa-teal pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${progress * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={1000}
              step={1}
              value={Math.round(progress * 1000)}
              onChange={event => {
                seek(Number(event.target.value) / 1000);
              }}
              aria-label="Seek"
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            />
          </div>
        </div>

        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-medium">{displayDuration}</span>
          {(time !== undefined || status !== undefined) && (
            <MessageMeta
              time={time}
              status={status}
              direction={direction}
              className={cn('text-muted-foreground')}
            />
          )}
        </div>
      </BubbleContent>
    </Bubble>
  );
}

export { AudioMessage };
