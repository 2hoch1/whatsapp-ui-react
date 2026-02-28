let _counter = 0

/** Generates a sequential, locally-unique message id. */
export function uid(): string {
  return `chat-${++_counter}`
}

/** Returns the current local time as a `HH:MM` string. */
export function nowTime(): string {
  const d = new Date()
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}
