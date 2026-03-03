import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { AvatarPlaceholderIcon, PauseIcon, PlayIcon } from '@/icons'
import { analyzeAudio, BAR_COUNT, fmtTime } from '@/utils/audio'
import React, { useEffect, useState } from 'react'
import { useMessage } from '../MessageContext'
import { Waveform } from './Waveform'

/** Props for the {@link Voice} component. */
export interface VoiceProps {
  /** URL of the voice message audio file. Streamed via an `<audio>` element. */
  src: string
  /** Fallback duration string (e.g. `'0:07'`) shown before audio metadata has loaded. */
  duration?: string
  /** Avatar URL displayed next to the waveform. Falls back to the sender avatar from `MessageContext`. */
  avatarUrl?: string
}

function Voice({ src, duration, avatarUrl: avatarProp }: VoiceProps): React.JSX.Element {
  const { direction, avatarUrl: ctxAvatar } = useMessage()
  const isOut = direction === 'out'
  const avatar = avatarProp ?? ctxAvatar

  const { audioRef, playing, progress, remaining, totalDuration, toggle, seek } =
    useAudioPlayer(src)

  const [bars, setBars] = useState<number[]>(Array<number>(BAR_COUNT).fill(0))
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (progress > 0) setHasPlayed(true)
  }, [progress])

  useEffect(() => {
    setBars(Array<number>(BAR_COUNT).fill(0))
    if (!src) return
    analyzeAudio(src, BAR_COUNT)
      .then(result => {
        setBars(result)
      })
      .catch(() => {})
  }, [src])

  const displayDuration = totalDuration > 0 ? fmtTime(remaining) : (duration ?? '0:00')

  return (
    <>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex h-13.75 w-[336px] min-w-[336px] shrink-0 items-center">
        {/* Avatar */}
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2a3942]"
        >
          {avatar ? (
            <img src={avatar} alt="" className="size-full object-cover" />
          ) : (
            <AvatarPlaceholderIcon className="size-6 text-[#8696a0]" />
          )}
        </span>

        <span className="w-5.5 shrink-0" />

        {/* Play / Pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="shrink-0 text-[#8696a0] transition-opacity hover:opacity-70"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <span className="w-6.25 shrink-0" />

        {/* Waveform */}
        {src ? (
          <Waveform
            bars={bars}
            progress={progress}
            isOut={isOut}
            hasPlayed={hasPlayed}
            seek={seek}
          />
        ) : (
          <span className="flex-1 text-xs text-[#8696a0]">No audio source</span>
        )}
      </div>

      <span
        className="pointer-events-none absolute bottom-1 left-28 text-xs font-medium text-[#8696a0]"
        aria-hidden="true"
      >
        {displayDuration}
      </span>
    </>
  )
}

export { Voice }
