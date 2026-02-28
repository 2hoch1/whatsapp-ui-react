import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

/** State returned by {@link useAudioPlayer}. */
export interface AudioPlayerState {
  /** Ref to attach to an `<audio>` element. */
  audioRef: React.RefObject<HTMLAudioElement>
  /** Whether the audio is currently playing. */
  playing: boolean
  /** Current playback position in seconds. */
  currentTime: number
  /** Total audio duration in seconds. */
  totalDuration: number
  /** Playback progress in the range `0`–`1`. */
  progress: number
  /** Remaining playback time in seconds. */
  remaining: number
  /** Toggles between play and pause. */
  toggle: () => void
  /** Seeks to a fractional position (`0`–`1`). */
  seek: (fraction: number) => void
}

/**
 * Manages playback state for an audio element.
 * Attach `audioRef` to an `<audio src={src}>` element.
 */
export function useAudioPlayer(src: string): AudioPlayerState {
  const audioRef = useRef<HTMLAudioElement>(null)
  const rafRef = useRef<number>(0)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current)
      return
    }
    const tick = (): void => {
      const el = audioRef.current
      if (el) setCurrentTime(el.currentTime)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [playing])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onMeta = (): void => {
      setTotalDuration(el.duration)
    }
    const onEnded = (): void => {
      setPlaying(false)
      cancelAnimationFrame(rafRef.current)
      setCurrentTime(0)
      el.currentTime = 0
    }
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('ended', onEnded)
    return () => {
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('ended', onEnded)
    }
  }, [src])

  const toggle = useCallback((): void => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      void el
        .play()
        .then(() => {
          setPlaying(true)
        })
        .catch(() => {})
    }
  }, [playing])

  const seek = useCallback(
    (fraction: number): void => {
      const el = audioRef.current
      if (!el || !totalDuration) return
      const t = Math.max(0, Math.min(fraction, 1)) * totalDuration
      el.currentTime = t
      setCurrentTime(t)
    },
    [totalDuration]
  )

  const progress = totalDuration > 0 ? Math.min(currentTime / totalDuration, 1) : 0
  const remaining = totalDuration > 0 ? totalDuration - currentTime : 0

  return { audioRef, playing, currentTime, totalDuration, progress, remaining, toggle, seek }
}
