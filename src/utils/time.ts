/** Returns `time` as-is, or the current local time formatted as `HH:MM`. */
export function getDisplayTime(time?: string): string {
  return time ?? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/**
 * Returns a human-readable date label for a day-divider:
 * `'Today'`, `'Yesterday'`, weekday name, or `D.M.YY`.
 */
export function getDisplayDate(date?: string): string {
  if (!date) return new Date().toLocaleDateString()

  const d = new Date(date)
  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const msgDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()) // normalise to midnight

  const diffDays = Math.round((today.getTime() - msgDay.getTime()) / 86_400_000)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return d.toLocaleDateString('en-US', { weekday: 'long' })

  // Format as D.M.YY (e.g. 23.1.26)
  const yy = d.getFullYear() % 100
  return `${d.getDate()}.${d.getMonth() + 1}.${yy}`
}
