/** Number of bars in the waveform visualisation. */
export const BAR_COUNT = 44

/**
 * Analyse an audio file at `url` using the Web Audio API and return an array
 * of `BAR_COUNT` amplitude values, each normalised to the range 0–10.
 *
 * Returns an array of zeros when no url is provided or on any error.
 */
export async function analyzeAudio(url: string, count: number = BAR_COUNT): Promise<number[]> {
  const ZEROS = (): number[] => Array<number>(count).fill(0)

  if (!url || typeof AudioContext === 'undefined') return ZEROS()

  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()

    const ctx = new AudioContext()
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
    await ctx.close()

    const data = audioBuffer.getChannelData(0)
    const chunkSize = Math.floor(data.length / count)

    const rmsValues: number[] = []
    for (let i = 0; i < count; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, data.length)
      let sum = 0
      for (let j = start; j < end; j++) {
        sum += (data[j] ?? 0) ** 2
      }
      rmsValues.push(Math.sqrt(sum / (end - start)))
    }

    const max = Math.max(...rmsValues, 0.0001)
    return rmsValues.map(v => Math.round((v / max) * 10))
  } catch {
    return ZEROS()
  }
}

/** Formats a duration in seconds as `M:SS`. */
export function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m)}:${String(s).padStart(2, '0')}`
}

/** Draws a rounded rectangle path on a 2-D canvas context. */
export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.lineTo(x + w - rr, y)
  ctx.arcTo(x + w, y, x + w, y + rr, rr)
  ctx.lineTo(x + w, y + h - rr)
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr)
  ctx.lineTo(x + rr, y + h)
  ctx.arcTo(x, y + h, x, y + h - rr, rr)
  ctx.lineTo(x, y + rr)
  ctx.arcTo(x, y, x + rr, y, rr)
  ctx.closePath()
}
