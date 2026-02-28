import { ChatReplyContext } from '@/components/Chat/ChatReplyContext'
import { extractTextFromNode } from '@/utils/extractText'
import type { Key } from 'react'
import React from 'react'

/** Options for {@link useReply}. */
export interface UseReplyOptions {
  /** React node whose extracted text is used as the match trigger. Compared case-insensitively against incoming message text. */
  onMessage: React.ReactNode
  /** React node appended to the chat when a match is found. Should be a fully-formed `<Message>` tree. */
  replyMessage: React.ReactNode
  /** Only match messages whose `senderId` equals this value. When omitted, messages from all senders are matched. */
  from?: string
  /** Limits the rule to fire at most once per hook lifetime. @defaultValue `false` */
  once?: boolean
}

/**
 * Subscribes to new messages in the nearest `<Chat>` and calls
 * {@link ChatReplyContextValue.addMessage} whenever an incoming message
 * matches the text extracted from `onMessage`.
 *
 * Must be rendered as a descendant of `<Chat>` (e.g. via the `onReply` prop).
 * The {@link Reply} component is the declarative wrapper for this hook.
 */
export function useReply({ onMessage, replyMessage, from, once = false }: UseReplyOptions): void {
  const { messages, addMessage } = React.useContext(ChatReplyContext)
  const firedRef = React.useRef(false)

  const seenIdsRef = React.useRef<Set<Key | undefined>>(new Set(messages.map(m => m.id)))

  React.useEffect(() => {
    if (once && firedRef.current) return

    const newMessages = messages.filter(m => !seenIdsRef.current.has(m.id))
    for (const m of newMessages) seenIdsRef.current.add(m.id)

    if (newMessages.length === 0) return

    const triggerText = extractTextFromNode(onMessage).trim().toLowerCase()
    if (!triggerText) return

    for (const msg of newMessages) {
      if (once && firedRef.current) break

      if (from !== undefined && msg.senderId !== from) continue

      const msgText = extractTextFromNode(msg.node).trim().toLowerCase()
      if (msgText === triggerText) {
        if (once) firedRef.current = true
        addMessage({ node: replyMessage })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])
}
