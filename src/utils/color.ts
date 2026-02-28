const SENDER_COLORS = [
  '#e91e8c',
  '#9c27b0',
  '#673ab7',
  '#2196f3',
  '#009688',
  '#4caf50',
  '#ff9800',
  '#ff5722',
  '#00bcd4',
  '#f06292',
  '#ef5350',
  '#26c6da',
]

/** Returns a deterministic accent color for a given sender name. */
export function senderColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffff
  }
  return SENDER_COLORS[hash % SENDER_COLORS.length] ?? '#2196f3'
}
