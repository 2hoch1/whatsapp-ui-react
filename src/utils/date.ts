/** Coerces a `Date` or ISO string to a `Date`, returning `null` on failure. */
export function toDate(value?: Date | string): Date | null {
  if (!value) return null
  const parsed = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

/** Returns `true` when `a` and `b` fall on the same calendar day. */
export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
