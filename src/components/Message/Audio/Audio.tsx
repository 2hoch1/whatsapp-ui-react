import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { AudioFileIcon, PauseIcon, PlayIcon } from '@/icons'
import { fmtTime } from '@/utils/audio'
import { cn } from '@/utils/cn'
import React, { useEffect, useState } from 'react'
import { useMessage } from '../MessageContext'

/** Props for the {@link Audio} component. */
export interface AudioProps {
  /** URL of the audio file. Streamed via an `<audio>` element. */
  src: string
  /** Fallback duration string (e.g. `'0:42'`) shown before audio metadata has loaded. */
  duration?: string
  /** File name shown as the icon tooltip. */
  fileName?: string
}

function Audio({ src, duration, fileName }: AudioProps): React.JSX.Element {
  const { direction } = useMessage()
  const isOut = direction === 'out'

  const { audioRef, playing, progress, remaining, totalDuration, toggle, seek } =
    useAudioPlayer(src)

  const [hasPlayed, setHasPlayed] = useState(false)
  useEffect(() => {
    if (progress > 0) setHasPlayed(true)
  }, [progress])

  const displayDuration = totalDuration > 0 ? fmtTime(remaining) : (duration ?? '0:00')
  const trackColor = isOut ? 'bg-wa-waveform-out' : 'bg-wa-waveform-in'
  const trackColorFaint = isOut ? 'bg-wa-waveform-out/40' : 'bg-wa-waveform-in/40'
  const dotColor = hasPlayed || isOut ? 'bg-wa-waveform-out' : 'bg-wa-waveform-in'

  return (
    <>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex h-13.75 w-84 min-w-84 shrink-0 items-center">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
        >
          <AudioFileIcon title={fileName} />
        </span>

        <span className="w-5.5 shrink-0" />

        {/* Play / Pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="shrink-0 text-wa-text-secondary transition-opacity hover:opacity-70"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <span className="w-6.25 shrink-0" />

        {/* Track - fills remaining width, flex-1 */}
        <div className="relative h-6 flex-1">
          <div
            className={cn(
              'pointer-events-none absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full',
              trackColorFaint
            )}
          />
          <div
            className={cn(
              'pointer-events-none absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full',
              trackColor
            )}
            style={{ width: `${progress * 100}%` }}
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full',
              dotColor
            )}
            style={{ left: `${progress * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={1000}
            step={1}
            value={Math.round(progress * 1000)}
            onChange={e => {
              seek(Number(e.target.value) / 1000)
            }}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Seek"
          />
        </div>
      </div>

      <span
        className="pointer-events-none absolute bottom-1 left-28 text-xs font-medium text-wa-text-secondary"
        aria-hidden="true"
      >
        {displayDuration}
      </span>
    </>
  )
}

export { Audio }
