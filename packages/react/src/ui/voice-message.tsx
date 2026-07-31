import * as React from 'react';

import { cn } from '@/lib/utils';
import { BAR_COUNT, analyzeAudio, fmtTime } from '@/lib/audio';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { PauseIcon, PlayIcon } from '@/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/components/avatar';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface VoiceMessageProps extends React.ComponentProps<'div'> {
  src: string;
  duration?: string;
  /** Sender avatar shown beside the waveform, as WhatsApp does for voice notes. */
  avatarUrl?: string;
  senderName?: string;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

/** Flat baseline used until the real amplitudes have been decoded. */
const FLAT_BARS: number[] = Array.from({ length: BAR_COUNT }, () => 0.15);

function VoiceMessage({
  src,
  duration,
  avatarUrl,
  senderName,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: VoiceMessageProps) {
  const { audioRef, playing, progress, remaining, totalDuration, toggle, seek } =
    useAudioPlayer(src);
  const [bars, setBars] = React.useState<number[]>(FLAT_BARS);

  React.useEffect(() => {
    let cancelled = false;

    analyzeAudio(src, BAR_COUNT)
      .then(amplitudes => {
        if (!cancelled && amplitudes.length > 0) setBars(amplitudes);
      })
      .catch(() => {
        // Decoding is best-effort: a CORS-blocked or unsupported file keeps the flat baseline.
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const displayDuration = totalDuration > 0 ? fmtTime(remaining) : (duration ?? '0:00');
  const playedBars = Math.round(progress * bars.length);

  return (
    <Bubble
      data-slot="voice-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={className}
      {...props}
    >
      <BubbleContent>
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex w-72 max-w-full items-center gap-3">
          {(avatarUrl || senderName) && (
            <Avatar className="size-10 shrink-0">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={senderName ?? ''} />}
              <AvatarFallback>{senderName?.slice(0, 2) ?? ''}</AvatarFallback>
            </Avatar>
          )}

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            className="text-muted-foreground shrink-0 transition-opacity hover:opacity-70"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="relative h-8 flex-1">
            <div aria-hidden="true" className="flex h-full items-center gap-px">
              {bars.map((amplitude, index) => (
                <span
                  key={index}
                  className={cn(
                    'flex-1 rounded-full transition-colors',
                    index < playedBars ? 'bg-wa-teal' : 'bg-muted-foreground/40'
                  )}
                  style={{ height: `${Math.max(amplitude, 0.08) * 100}%` }}
                />
              ))}
            </div>
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
              className="text-muted-foreground"
            />
          )}
        </div>
      </BubbleContent>
    </Bubble>
  );
}

export { VoiceMessage };
