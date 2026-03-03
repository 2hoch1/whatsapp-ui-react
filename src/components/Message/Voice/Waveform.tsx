import { BAR_COUNT, roundRect } from '@/utils/audio'
import { cn } from '@/utils/cn'
import React, { useEffect, useRef } from 'react'

// Canvas dimensions - keep width in sync with the wrapper div (w-[200px])
export const CANVAS_WIDTH = 200
const CANVAS_HEIGHT = 30

const BAR_MAX_HEIGHT = 26
const BAR_WIDTH = 3
const SLOT_WIDTH = CANVAS_WIDTH / BAR_COUNT

const COLORS = {
  waveformOut: '#53bdeb',
  waveformIn: '#8696a0',
  waveformOutFaint: 'rgba(83, 189, 235, 0.4)',
  waveformInFaint: 'rgba(134, 150, 160, 0.4)',
}

/** @internal */
export interface WaveformProps {
  /** Amplitude bars to render - array of `BAR_COUNT` values in the range `0`–`10`. */
  bars: number[]
  /** Playback progress in the range `0`–`1`; determines the played/unplayed colour split. */
  progress: number
  /** `true` for outgoing messages; controls which CSS colour variables are used. */
  isOut: boolean
  /** `true` once the user has started playback; affects the unplayed colour. */
  hasPlayed: boolean
  /** Callback invoked with a fractional position (`0`–`1`) when the user clicks the waveform. */
  seek: (fraction: number) => void
}

function Waveform({ bars, progress, isOut, hasPlayed, seek }: WaveformProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    const colorPlayed = isOut ? COLORS.waveformOut : COLORS.waveformIn
    const colorUnplayed = isOut ? COLORS.waveformOutFaint : COLORS.waveformInFaint

    bars.forEach((amplitude, i) => {
      // Treat 0 (silence / not yet loaded) as 1 - every bar shows as a minimal dot
      const level = Math.max(1, amplitude)
      const barHeight = Math.round((level / 10) * BAR_MAX_HEIGHT)
      const x = i * SLOT_WIDTH + (SLOT_WIDTH - BAR_WIDTH) / 2
      const y = (CANVAS_HEIGHT - barHeight) / 2

      ctx.fillStyle = i / BAR_COUNT < progress ? colorPlayed : colorUnplayed
      roundRect(ctx, x, y, BAR_WIDTH, barHeight, BAR_WIDTH / 2)
      ctx.fill()
    })
  }, [bars, progress, isOut])

  return (
    <div className="relative h-7.5 w-50 shrink-0">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        aria-hidden="true"
        className="h-7.5 w-50"
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full',
          hasPlayed || isOut ? 'bg-[#53bdeb]' : 'bg-[#8696a0]'
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
  )
}

export { Waveform }
