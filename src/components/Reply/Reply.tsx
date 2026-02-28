import { useReply } from '@/hooks/useReply'
import type React from 'react'

/** Props for the {@link Reply} component. */
export interface ReplyProps {
  /** React node whose extracted text is used as the match trigger. Compared case-insensitively against incoming message text. */
  onMessage: React.ReactNode
  /** React node appended to the chat when a match is found. Should be a fully-formed `<Message>` tree. */
  replyMessage: React.ReactNode
  /** Only match messages whose `senderId` equals this value. @defaultValue `'me'` */
  from?: string
  /** Limits the rule to fire at most once per component lifetime. @defaultValue `false` */
  once?: boolean
}

export function Reply({ onMessage, replyMessage, from = 'me', once }: ReplyProps): null {
  useReply({
    onMessage,
    replyMessage,
    from,
    ...(once !== undefined ? { once } : {}),
  })
  return null
}
