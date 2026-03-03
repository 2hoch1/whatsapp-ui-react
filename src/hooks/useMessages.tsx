import { ChatReplyContext } from '@/components/Chat/ChatReplyContext'
import type { GroupedMessage } from '@/utils/groupMessages'
import type { Key } from 'react'
import React from 'react'

/**
 * Calls `callback` for every new message that arrives in the nearest `<Chat>`.
 * Must be rendered as a descendant of `<Chat>` (e.g. via the `onReply` prop).
 */
export function useMessages(callback: (message: GroupedMessage) => void): void {
  const { messages } = React.useContext(ChatReplyContext)
  const seenIdsRef = React.useRef<Set<Key | undefined>>(new Set(messages.map(m => m.id)))
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback

  React.useEffect(() => {
    const newMessages = messages.filter(m => !seenIdsRef.current.has(m.id))
    for (const m of newMessages) seenIdsRef.current.add(m.id)
    for (const m of newMessages) callbackRef.current(m)
  }, [messages])
}
