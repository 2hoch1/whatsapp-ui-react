import React from 'react'
import type { GroupedMessage } from './MessageList'

/** Options for {@link ChatReplyContextValue.addMessage}. */
export interface AddMessageOptions {
  /** The React node to render as the new message. */
  node: React.ReactNode
  /** `senderId` stored on the resulting {@link GroupedMessage}. @defaultValue `'me'` */
  senderId?: string
}

/** Shape of the context provided by {@link Chat} to its descendants. */
export interface ChatReplyContextValue {
  /** Current ordered list of all messages in the chat. */
  messages: GroupedMessage[]
  /** Sends a plain-text message as the local user (`senderId: 'me'`). */
  sendMessage: (text: string) => void
  /** Programmatically appends an arbitrary message node to the chat. */
  addMessage: (options: AddMessageOptions) => void
  /** @internal `true` only when a real `<Chat>` component provides this context. */
  provided: boolean
}

export const ChatReplyContext = React.createContext<ChatReplyContextValue>({
  messages: [],
  sendMessage: () => {},
  addMessage: () => {},
  provided: false,
})
